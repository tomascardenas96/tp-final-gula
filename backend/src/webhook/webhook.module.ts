import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { FoodOnCartModule } from 'src/food_on_cart/food_on_cart.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [FoodOnCartModule, CartModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
