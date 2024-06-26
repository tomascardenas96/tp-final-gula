import { Module } from '@nestjs/common';
import { FoodOnCartService } from './food_on_cart.service';
import { FoodOnCartController } from './food_on_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';
import { CartModule } from 'src/cart/cart.module';
import { UserModule } from 'src/user/user.module';
import { FoodModule } from 'src/food/food.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodOnCart]),
    CartModule,
    UserModule,
    FoodModule,
    SocketModule,
  ],
  controllers: [FoodOnCartController],
  providers: [FoodOnCartService],
  exports: [FoodOnCartService],
})
export class FoodOnCartModule {}
