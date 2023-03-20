import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { _403, _404 } from 'src/common/constants/error.constants';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  listCustomers: Customer[] = [];

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(email: string): Promise<Customer> {
    const customerExists = await this.customerRepository.findOneBy({ email });

    if (!customerExists) throw new ForbiddenException(_404.NO_CUSTOMER_FOUND);

    return customerExists;
  }

  async createCustomer(customerDto: CreateCustomerDto): Promise<Customer> {
    const customerExists = this.listCustomers.find(
      (customer) => customer.email == customerDto.email,
    );
    if (customerExists)
      throw new ForbiddenException(_403.CUSTOMER_EXISTS_ALREADY);
    const salt = await bcrypt.genSalt();
    customerDto.password = await bcrypt.hashSync(customerDto.password, salt);
    return await this.customerRepository.save(customerDto);
  }

  async update(
    email: string,
    customerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customerExists = await this.customerRepository.findOneBy({ email });
    if (!customerExists) throw new ForbiddenException(_404.NO_CUSTOMER_FOUND);
    customerExists.name = customerDto.name || customerExists.name;
    customerExists.address = customerDto.address || customerExists.address;
    customerExists.gender = customerDto.gender || customerExists.gender;
    customerExists.password = customerDto.password || customerExists.password;
    return await this.customerRepository.save(customerExists);
  }
}
