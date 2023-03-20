import { BaseEntity } from 'src/common/entities/base.entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Wallet } from '../wallets/wallet.entity';

@Entity()
export class Transaction extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  type: string;

  @ManyToOne(() => Wallet, { cascade: true })
  source: Wallet;

  @ManyToOne(() => Wallet, { cascade: true })
  destination: Wallet;
}
