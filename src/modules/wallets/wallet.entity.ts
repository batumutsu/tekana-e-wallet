import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from 'src/modules/customers/customer.entity';
import { BaseEntity } from 'src/common/entities/base.entities';

@Entity()
export class Wallet extends BaseEntity {
  @Column()
  balance: number;

  @Column()
  name: string;

  @ManyToOne(() => Customer, { cascade: true })
  @JoinColumn({ referencedColumnName: 'email' })
  customer: Customer;
}
