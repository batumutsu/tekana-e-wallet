import { PickType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PickType(CreateTransactionDto, [
  'type',
  'amount',
] as const) {}
