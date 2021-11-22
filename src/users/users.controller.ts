import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {};

  @Post()
  create(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.createUser(dto);
  };

  @Get()
  getAll(): Promise<Array<CreateUserDto>> {
    return this.usersService.getAllUsers();
  };

  @Get(':id')
  getOne(@Param('id') id: string): Promise<CreateUserDto> {
    return this.usersService.getOneUser(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UpdateUserDto> {
    return this.usersService.updateUser(+id, dto);
  };

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.deleteUser(+id);
  };
};
