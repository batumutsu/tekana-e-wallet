import { ForbiddenException, Injectable } from '@nestjs/common';
import { _404 } from 'src/common/constants/error.constants';
import { comparePasswords } from 'src/common/helpers/common.helper';
import { CustomerService } from '../customers/customers.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateCustomer(email: string, pass: string): Promise<any> {
    const customer = await this.customerService.findOne(email);

    return customer &&
      (await comparePasswords(pass, customer.password)).valueOf()
      ? customer
      : (() => {
          throw new ForbiddenException(_404.NO_CUSTOMER_FOUND);
        })();
  }

  async login(customer: any) {
    const payload = { name: customer.user.email, sub: customer.user.password };
    console.log(
      `hereeuygfefggsdhfcgshjdgjhgdsfjhd000000000pay ${payload.name}`,
    );
    console.log(`hereeuygfefggsdhfcgshjdgjhgdsfjhd000000000pay ${payload.sub}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
