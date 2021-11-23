import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: LoginAuthDto }) {
    return req.user;
  };
};
