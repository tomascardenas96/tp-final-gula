import { IsString, IsEmail, IsDate } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  location: string;

  @IsString()
  birthDate: string;
}
