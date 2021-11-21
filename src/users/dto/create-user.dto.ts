import { IsEmail } from 'class-validator';

export class CreateUserDto {
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  readonly password?: string;
};
