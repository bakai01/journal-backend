import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>
  ) {};

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.usersRepository.save(dto);
    return user;
  };

  getAllUsers(): string {
    return  'Action for returns all users';
  };

  getOneUser(id: number): string {
    return `Action for return one user by id: ${id}`;
  };

  updateUser(id: number, dto: UpdateUserDto): string {
    return `Action for update user by id: ${id}`;
  };

  deleteUser(id: number): string {
    return `Action for delete user by id: ${id}`;
  };
};
