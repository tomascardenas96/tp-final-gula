import { IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsString()
  stock: string;

  @IsOptional()
  image?: Express.Multer.File;

  @IsString()
  review: string;

  @IsString()
  category: string;
}
