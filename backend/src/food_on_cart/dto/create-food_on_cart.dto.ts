import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFoodOnCartDto {
  @IsNumber()
  @IsNotEmpty()
  food: number;

  @IsNumber()
  @IsOptional()
  amount: number;
}
