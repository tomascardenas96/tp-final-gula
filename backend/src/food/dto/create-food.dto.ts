import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  stock: string;

  @IsOptional()
  image?: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
