import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FoodOnCartService } from './food_on_cart.service';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { Food } from 'src/food/entities/food.entity';
import { AddOrSubtractProductDto } from './dto/add-subtract.dto';

@UseGuards(AuthGuard)
@Controller('food-on-cart')
export class FoodOnCartController {
  constructor(private readonly foodOnCartService: FoodOnCartService) {}

  @Post()
  addFoodOnCart(
    @ActiveUser() activeUser: ActiveUserInterface,
    @Body() foodOnCartDto: CreateFoodOnCartDto,
  ) {
    return this.foodOnCartService.addFoodOnCart(activeUser, foodOnCartDto);
  }

  @Get()
  getFoodsByActiveCart(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.foodOnCartService.getFoodsByActiveCart(activeUser);
  }

  @Patch('add-subtract')
  addOrSubtractProduct(
    @Body() { option, food }: AddOrSubtractProductDto,
    @ActiveUser() activeUser: ActiveUserInterface,
  ) {
    return this.foodOnCartService.addOrSubtractProduct(option, food, activeUser);
  }
}
