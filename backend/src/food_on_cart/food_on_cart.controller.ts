import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FoodOnCartService } from './food_on_cart.service';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { UpdateFoodOnCartDto } from './dto/update-food_on_cart.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';

@UseGuards(AuthGuard)
@Controller('food-on-cart')
export class FoodOnCartController {
  constructor(private readonly foodOnCartService: FoodOnCartService) {}

  @Post()
  addFoodOnCart(
    @ActiveUser() activeUser: ActiveUserInterface,
    @Body() foodOnCartDto: CreateFoodOnCartDto,
  ) {
    return this.foodOnCartService.addFoodOnCart(activeUser, foodOnCartDto)
  }
}
