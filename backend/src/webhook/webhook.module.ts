import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { FoodOnCartModule } from '../food_on_cart/food_on_cart.module';
import { CartModule } from '../cart/cart.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [FoodOnCartModule, CartModule, InvoiceModule, SocketModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
