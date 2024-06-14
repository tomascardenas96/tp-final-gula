import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { CategoryModule } from 'src/category/category.module';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [TypeOrmModule.forFeature([Food]), CategoryModule, ShopModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
