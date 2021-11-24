import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/users/dto/user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: UserDto }) {
    return req.user;
  };
};
