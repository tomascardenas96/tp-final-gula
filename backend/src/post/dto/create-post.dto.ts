import { IsNotEmpty, IsString } from 'class-validator';
import { Shop } from 'src/shop/entities/shop.entity';

export class CreatePostDto {
  @IsString()
  description: string;
}
