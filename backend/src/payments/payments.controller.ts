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
import { PaymentsService } from './payments.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-preference')
  async createPreference(@Body() foodOnCart: FoodOnCart[]) {
    return await this.paymentsService.createPreference(foodOnCart);
  }
}
