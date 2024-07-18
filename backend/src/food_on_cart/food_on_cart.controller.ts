import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete
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
  constructor(private readonly foodOnCartService: FoodOnCartService) { }

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

   //Metodo de Gaston Nro. 4.
  // Este endpoint trae lo que haya añadido en el carrito de compras.
  @Get()
  getAllFoodOnCart() {
    return this.foodOnCartService.getAllFoodOnCart();
  }

  // Nuevo endpoint para eliminar todos los registros de food_on_cart
  @Delete()
  deleteAllFoodOnCart() {
    return this.foodOnCartService.deleteAllFoodOnCart();
  }

  // Nuevo endpoint para eliminar un registro por su foodOnCartId
  @Delete(':id')
  deleteFoodOnCartById(@Param('id') id: number) {
    return this.foodOnCartService.deleteFoodOnCartById(id);
  }
}
