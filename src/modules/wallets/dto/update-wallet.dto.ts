import { PickType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PickType(CreateWalletDto, [
  'balance',
  'name',
] as const) {}
