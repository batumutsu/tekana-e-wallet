import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { _403, _404 } from 'src/common/constants/error.constants';
import { mapErrors } from 'src/common/helpers/common.helper';
import { JwtAuthGuard } from 'src/common/helpers/jwt.guards';
import { Customer } from './customer.entity';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customer endpoints')
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'List all customers' })
  async findAll(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Get(':email')
  @ApiOperation({ summary: 'Search one customer' })
  @ApiForbiddenResponse(mapErrors([_404.NO_CUSTOMER_FOUND]))
  async findOne(@Param('email') email: string): Promise<Customer> {
    return await this.customerService.findOne(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create new customer' })
  @ApiForbiddenResponse(mapErrors([_403.CUSTOMER_EXISTS_ALREADY]))
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @Patch(':email')
  @ApiOperation({ summary: 'Update one customer' })
  @ApiForbiddenResponse(mapErrors([_404.NO_CUSTOMER_FOUND]))
  async update(
    @Param('email') email: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.update(email, updateCustomerDto);
  }
}
