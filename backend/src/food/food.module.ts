import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { CategoryModule } from 'src/category/category.module';
import { ShopModule } from 'src/shop/shop.module';
import { FoodOnCartModule } from 'src/food_on_cart/food_on_cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
    CategoryModule,
    ShopModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
