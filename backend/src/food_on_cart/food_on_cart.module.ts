import { Module } from '@nestjs/common';
import { FoodOnCartService } from './food_on_cart.service';
import { FoodOnCartController } from './food_on_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodOnCart])],
  controllers: [FoodOnCartController],
  providers: [FoodOnCartService],
})
export class FoodOnCartModule {}
