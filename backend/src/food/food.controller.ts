import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('filter')
  findFoodByQuery(@Query('food') food: string) {
    return this.foodService.findFoodByQuery(food);
  }

  @Get('category/:shop/:category')
  findFoodByShopAndCategory(
    @Param('shop') profilename: string,
    @Param('category') category: string,
  ) {
    return this.foodService.findFoodByShopAndCategory(profilename, category);
  }
}
