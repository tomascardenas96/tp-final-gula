import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodOnCartDto } from './create-food_on_cart.dto';

export class UpdateFoodOnCartDto extends PartialType(CreateFoodOnCartDto) {}
