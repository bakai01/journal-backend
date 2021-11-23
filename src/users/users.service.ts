import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {};

  private async getUserById(id: number): Promise<GetUserDto> | undefined {
    const user = await this.usersRepository.findOne({ id });
    return user;
  };

  async getUserByEmail(email: string): Promise<GetUserDto> | undefined {
    const user = await this.usersRepository.findOne({ email });
    return user;
  };

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const userExist = await this.getUserByEmail(dto.email);

    if (userExist) {
      throw new HttpException('Пользователь с такой почтой уже существует', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.save(dto);
    return user;
  };

  async getAllUsers(): Promise<Array<CreateUserDto>> {
    const users = await this.usersRepository.find();
    return users;
  };

  async getOneUser(id: number): Promise<CreateUserDto> {
    const user = await this.getUserById(id);

    if (user) {
      return user;
    }

    throw new HttpException('Такого пользователя не существует', HttpStatus.NOT_FOUND);
  };

  async updateUser(id: number, dto: UpdateUserDto): Promise<UpdateUserDto> {
    const userExist = await this.getUserById(id);

    if (userExist) {
      const user = this.usersRepository.save({
        id,
        email: dto.email,
        fullName: dto.fullName
      });

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
};
