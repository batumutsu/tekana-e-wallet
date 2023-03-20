import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entities';
import { Gender } from 'src/common/enums/common.enums';
import { Entity, Column } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @MinLength(10)
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @Column({ type: 'enum', enum: Gender })
  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;

  @Column()
  @ApiHideProperty()
  password: string;
}
