import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor () {};

  createUser(dto: CreateUserDto): string {
    return 'Action for create user';
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
