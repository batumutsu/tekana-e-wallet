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
import { _404 } from 'src/common/constants/error.constants';
import { mapErrors } from 'src/common/helpers/common.helper';
import { JwtAuthGuard } from 'src/common/helpers/jwt.guards';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transactions.service';
@ApiTags('Transaction endpoints')
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Search one transaction' })
  @ApiForbiddenResponse(mapErrors([_404.NO_TRANSACTION_FOUND]))
  async findOne(@Param('id') id: string): Promise<Transaction> {
    return await this.transactionService.findOne(id);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Search all customer transactions' })
  @ApiForbiddenResponse(mapErrors([_404.NO_CUSTOMER_FOUND]))
  async findAll(@Param('email') email: string): Promise<Transaction[]> {
    return await this.transactionService.findAll(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create new transaction' })
  @ApiForbiddenResponse(
    mapErrors([
      _404.NO_CUSTOMER_FOUND,
      _404.NO_SOURCE_WALLET_FOUND,
      _404.NO_DESTINATION_WALLET_FOUND,
      _404.INSUFFICIENT_AMOUNT,
    ]),
  )
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.createTransaction(
      createTransactionDto,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one transaction' })
  @ApiForbiddenResponse(mapErrors([_404.NO_TRANSACTION_FOUND]))
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.update(id, updateTransactionDto);
  }
}
