import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { _404 } from 'src/common/constants/error.constants';
import { CustomerService } from 'src/modules/customers/customers.service';
import { DataSource, Repository } from 'typeorm';
import { WalletService } from '../wallets/wallets.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './repository/transaction.repository';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly customerService: CustomerService,
    private readonly walletService: WalletService,
    private readonly transactionRepositoryUd: TransactionRepository,
    private dataSource: DataSource,
  ) {}

  async findOne(id: string): Promise<Transaction> {
    const transactionExists = await this.transactionRepository.findOneBy({
      id,
    });

    if (!transactionExists)
      throw new ForbiddenException(_404.NO_TRANSACTION_FOUND);

    return transactionExists;
  }

  async findAll(email: string): Promise<Transaction[]> {
    const customerExists = await this.customerService.findOne(email);

    if (!customerExists) throw new ForbiddenException(_404.NO_CUSTOMER_FOUND);

    return await this.transactionRepositoryUd.findAllTransOfCustomer(email);
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const [sourceWallet, destinationWallet] = await Promise.all([
      this.walletService.findOne(createTransactionDto.source.id),
      this.walletService.findOne(createTransactionDto.destination.id),
    ]);

    !sourceWallet
      ? () => {
          throw new ForbiddenException(_404.NO_SOURCE_WALLET_FOUND);
        }
      : !destinationWallet
      ? () => {
          throw new ForbiddenException(_404.NO_DESTINATION_WALLET_FOUND);
        }
      : sourceWallet.balance < createTransactionDto.amount
      ? () => {
          throw new ForbiddenException(_404.INSUFFICIENT_AMOUNT);
        }
      : null;

    const transaction = new Transaction();

    transaction.source = sourceWallet;
    transaction.destination = destinationWallet;
    transaction.amount = createTransactionDto.amount;
    sourceWallet.balance -= createTransactionDto.amount;
    destinationWallet.balance += createTransactionDto.amount;

    await this.dataSource.transaction(async (manager) => {
      await manager.save(sourceWallet);
      await manager.save(destinationWallet);
      await manager.save(createTransactionDto);
    });

    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   await queryRunner.manager.save(sourceWallet);
    //   await queryRunner.manager.save(destinationWallet);
    //   await queryRunner.manager.save(createTransactionDto);
    //   await queryRunner.commitTransaction();
    // } catch (err) {
    //   // since we have errors lets rollback the changes we made
    //   await queryRunner.rollbackTransaction();
    //   throw new ForbiddenException(_404.ERROR_SAVING_TRANSACTION);
    // } finally {
    //   // you need to release a queryRunner which was manually instantiated
    //   await queryRunner.release();
    // }

    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transactionExists = await this.transactionRepository.findOneBy({
      id,
    });
    if (!transactionExists)
      throw new ForbiddenException(_404.NO_TRANSACTION_FOUND);
    transactionExists.amount =
      updateTransactionDto.amount || transactionExists.amount;
    transactionExists.type =
      updateTransactionDto.type || transactionExists.type;
    return await this.transactionRepository.save(transactionExists);
  }
}
