import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Food } from 'src/food/entities/food.entity';

export class CreateFoodOnCartDto {
  @IsNumber()
  @IsNotEmpty()
  food: number;

  @IsNumber()
  @IsOptional()
  amount: number;
}
