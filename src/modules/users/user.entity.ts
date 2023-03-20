import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserType } from 'src/common/enums/common.enums';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  @PrimaryColumn()
  username: string;
  @Column()
  @IsString()
  @ApiProperty({ required: false, readOnly: true })
  password: string;

  @Column({ type: 'enum', enum: UserType })
  @IsEnum(UserType)
  @IsNotEmpty()
  @ApiProperty()
  type: UserType;

  @IsNotEmpty()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Column()
  lastName: string;

  @IsNotEmpty()
  @Column()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
