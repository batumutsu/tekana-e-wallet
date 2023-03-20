import { OmitType } from '@nestjs/swagger';
import { Customer } from '../customer.entity';

export class CreateCustomerDto extends OmitType(Customer, [
  'id',
  'updatedAt',
  'createdAt',
] as const) {}
