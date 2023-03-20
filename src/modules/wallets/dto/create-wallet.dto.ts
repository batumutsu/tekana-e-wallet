import { OmitType } from '@nestjs/swagger';
import { Wallet } from '../wallet.entity';

export class CreateWalletDto extends OmitType(Wallet, [
  'id',
  'updatedAt',
  'createdAt',
] as const) {}
