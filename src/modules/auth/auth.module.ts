import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerService } from '../customers/customers.service';
import { LocalStrategy } from 'src/common/helpers/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/customer.entity';
import { JwtModule } from '@nestjs/jwt';
//import { SessionSerializer } from 'src/common/helpers/session.serializer';
import * as dotenv from 'dotenv';
import { JwtStrategy } from 'src/common/helpers/jwt.strategy';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_COOKIE_EXP },
    }),
    TypeOrmModule.forFeature([Customer]),
    //PassportModule.register({ session: true }),
    PassportModule,
  ],
  providers: [
    AuthService,
    CustomerService,
    LocalStrategy /*, SessionSerializer*/,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
