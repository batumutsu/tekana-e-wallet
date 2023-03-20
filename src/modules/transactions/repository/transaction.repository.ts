import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from '../transaction.entity';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }

  async findAllTransOfCustomer(email: string): Promise<Transaction[]> {
    return this.createQueryBuilder('transaction')
      .where('transaction.sourceWallet.customer.email = :email', { email })
      .orWhere('transaction.destinationWallet.customer.email = :email', {
        email,
      })
      .getMany();
  }
}
