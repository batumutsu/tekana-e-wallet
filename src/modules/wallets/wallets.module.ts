import { Module } from '@nestjs/common';
import { WalletService } from './wallets.service';
import { WalletController } from './wallets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { Customer } from 'src/modules/customers/customer.entity';
import { CustomerService } from '../customers/customers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    TypeOrmModule.forFeature([Customer]),
    CustomersModule,
  ],
  providers: [WalletService, CustomerService],
  controllers: [WalletController],
})
export class WalletsModule {}
