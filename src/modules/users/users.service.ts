import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    const customerExists = await this.usersRepository.findOneBy({ username });

    if (!customerExists) throw new NotFoundException();

    return customerExists;
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.usersRepository.find({});
  }
}
