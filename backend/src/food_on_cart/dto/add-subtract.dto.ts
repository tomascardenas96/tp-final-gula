import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Food } from 'src/food/entities/food.entity';

export class AddOrSubtractProductDto {
  @IsString()
  option: string;

  @IsObject()
  food: Food;
}
