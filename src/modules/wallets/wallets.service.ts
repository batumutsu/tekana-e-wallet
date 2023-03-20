import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { _404 } from 'src/common/constants/error.constants';
import { Repository } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { CustomerService } from '../customers/customers.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  listWallets: Customer[] = [];

  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly customerService: CustomerService,
  ) {}

  async findOne(id: string): Promise<Wallet> {
    const walletExists = await this.walletRepository.findOneBy({ id });

    if (!walletExists) throw new ForbiddenException(_404.NO_WALLET_FOUND);

    return walletExists;
  }

  async findAll(email: Customer): Promise<Wallet[]> {
    const customerExists = await this.customerService.findOne(email.email);

    if (!customerExists) throw new ForbiddenException(_404.NO_CUSTOMER_FOUND);

    return await this.walletRepository.findBy(email);
  }

  async createWallet(
    email: string,
    createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    const customerExists = await this.customerService.findOne(email);

    if (!customerExists) throw new ForbiddenException(_404.NO_CUSTOMER_FOUND);

    createWalletDto.customer = customerExists;

    return await this.walletRepository.save(createWalletDto);
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const walletExists = await this.walletRepository.findOneBy({ id });

    if (!walletExists) throw new ForbiddenException(_404.NO_WALLET_FOUND);

    walletExists.name = updateWalletDto.name || walletExists.name;
    walletExists.balance = updateWalletDto.balance || walletExists.balance;
    return await this.walletRepository.save(walletExists);
  }

  async addFunds(wallet: Wallet, amount: number): Promise<any> {
    wallet.balance += amount || wallet.balance;
    return await this.walletRepository.save(wallet);
  }

  async subtractFunds(wallet: Wallet, amount: number): Promise<any> {
    wallet.balance -= amount || wallet.balance;
    return await this.walletRepository.save(wallet);
  }
}
