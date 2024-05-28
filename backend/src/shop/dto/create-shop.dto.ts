import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateShopDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  phone: string;

  @IsString()
  profilename: string;

  @IsString()
  picture: string;

  @IsNotEmpty()
  user: User;
}
