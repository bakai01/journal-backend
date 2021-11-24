import { Injectable } from '@nestjs/common';

import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService
  ) {};

  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.userService.getFullUser(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  };
};
