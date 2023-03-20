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
import { Customer } from 'src/modules/customers/customer.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallets.service';

@ApiTags('Wallet endpoints')
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Search one wallet' })
  @ApiForbiddenResponse(mapErrors([_404.NO_WALLET_FOUND]))
  async findOne(@Param('id') id: string): Promise<Wallet> {
    return await this.walletService.findOne(id);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Search all customer wallets' })
  @ApiForbiddenResponse(mapErrors([_404.NO_CUSTOMER_FOUND]))
  async findAll(@Param('email') email: Customer): Promise<Wallet[]> {
    return await this.walletService.findAll(email);
  }

  @Post()
  @ApiOperation({ summary: 'create new wallet' })
  @ApiForbiddenResponse(mapErrors([_404.NO_CUSTOMER_FOUND]))
  async create(
    @Param('email') email: string,
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    return await this.walletService.createWallet(email, createWalletDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update one wallet' })
  @ApiForbiddenResponse(mapErrors([_404.NO_WALLET_FOUND]))
  async update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<Wallet> {
    return await this.walletService.update(id, updateWalletDto);
  }
}
