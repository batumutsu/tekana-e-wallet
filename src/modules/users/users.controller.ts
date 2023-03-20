import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './users.service';
@ApiTags('User endpoints')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }

  @Get(':username')
  @ApiOperation({ summary: 'Get one user' })
  async findOne(@Param('username') email: string): Promise<User> {
    return await this.usersService.findOne(email);
  }
}
