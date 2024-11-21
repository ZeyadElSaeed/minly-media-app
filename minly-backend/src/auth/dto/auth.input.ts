import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
