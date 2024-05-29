import { IsString } from 'class-validator';

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
}
