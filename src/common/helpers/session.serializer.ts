import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { CustomerService } from 'src/modules/customers/customers.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private customerService: CustomerService) {
    super();
  }
  serializeUser(customer: any, done: (err: Error, customer: any) => void): any {
    done(null, { email: customer.email });
  }
  deserializeUser(payload: any, done: (err: Error, payload: any) => void): any {
    const customer = this.customerService.findOne(payload.email);
    done(null, customer);
  }
}
