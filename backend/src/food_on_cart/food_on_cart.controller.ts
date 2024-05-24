import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodOnCartService } from './food_on_cart.service';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { UpdateFoodOnCartDto } from './dto/update-food_on_cart.dto';

@Controller('food-on-cart')
export class FoodOnCartController {
  constructor(private readonly foodOnCartService: FoodOnCartService) {}

}
