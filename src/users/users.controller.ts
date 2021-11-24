import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {};

  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(dto);
  };

  @Get()
  getAll(): Promise<Array<UserDto>> {
    return this.usersService.getAllUsers();
  };

  @Get(':id')
  getOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.getOneUser(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.updateUser(+id, dto);
  };

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.deleteUser(+id);
  };
};
