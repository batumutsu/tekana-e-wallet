import { Module } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { CustomerService } from 'src/modules/customers/customers.service';
import { Customer } from 'src/modules/customers/customer.entity';
import { Wallet } from '../wallets/wallet.entity';
import { WalletService } from '../wallets/wallets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Wallet]),
    CustomersModule,
  ],
  providers: [
    TransactionService,
    TransactionRepository,
    CustomerService,
    WalletService,
  ],
  controllers: [TransactionController],
})
export class TransactionsModule {}
