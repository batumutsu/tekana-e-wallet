import { OmitType } from '@nestjs/swagger';
import { Transaction } from '../transaction.entity';

export class CreateTransactionDto extends OmitType(Transaction, [
  'id',
  'updatedAt',
  'createdAt',
] as const) {}
