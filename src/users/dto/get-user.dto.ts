import { CreateUserDto } from './create-user.dto';

export class GetUserDto extends CreateUserDto {
  readonly id: number;
};
