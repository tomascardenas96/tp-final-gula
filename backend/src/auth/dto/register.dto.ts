import { IsString, IsEmail, IsDate, IsNotEmpty} from 'class-validator';


//agregar validaciones IsNotEmpty
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;
}
