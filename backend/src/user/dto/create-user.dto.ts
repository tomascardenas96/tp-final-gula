import { IsDateString, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
