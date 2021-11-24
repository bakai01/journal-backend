import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {};

  private async getUserById(id: number): Promise<UserDto> | undefined {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return user;
  };

  private async getUserByEmail(email: string): Promise<UserDto> | undefined {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return user;
  };

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const userExist = await this.getUserByEmail(dto.email);

    if (userExist) {
      throw new HttpException('Пользователь с такой почтой уже существует', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.save(dto);
    const { password, ...result } = user;
    return result;
  };

  async getAllUsers(): Promise<Array<UserDto>> {
    const users = await this.usersRepository.find();
    const result = users.map(user => {
      const { password, ...data } = user;
      return data;
    });
    return result;
  };

  async getOneUser(id: number): Promise<UserDto> {
    const user = await this.getUserById(id);

    if (user) {
      return user;
    }

    throw new HttpException('Такого пользователя не существует', HttpStatus.NOT_FOUND);
  };

  async updateUser(id: number, dto: UpdateUserDto): Promise<UpdateResult> {
    const userExist = await this.getUserById(id);

    if (userExist) {
      const user = this.usersRepository.update(id, dto);

      return user;
    }

    throw new HttpException('Такого пользователя не существует', HttpStatus.NOT_FOUND);
  };

  async deleteUser(id: number): Promise<DeleteResult> {
    const userExist = await this.getUserById(id);

    if (userExist) {
      const user = await this.usersRepository.delete({ id });

      return user;
    }

    throw new HttpException('Такого пользователя не существует', HttpStatus.NOT_FOUND);
  };

  async getFullUser(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ email });
    return user;
  };
};
