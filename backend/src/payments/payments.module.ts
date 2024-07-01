import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { FoodOnCartModule } from 'src/food_on_cart/food_on_cart.module';

@Module({
  imports: [FoodOnCartModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
