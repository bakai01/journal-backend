import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {};

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  };

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  };

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOneUser(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.usersService.updateUser(+id, dto);
  };

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  };
};
