import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>
  ) {};

  private async getUserById(id: number): Promise<CreateUserDto> | undefined {
    const user = await this.usersRepository.findOne({ id });
    return user;
  };

  private async getUserByEmail(email: string): Promise<CreateUserDto> | undefined {
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

  async updateUser(id: number, dto: CreateUserDto): Promise<CreateUserDto> {
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
