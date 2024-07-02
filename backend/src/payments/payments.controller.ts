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
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-preference')
  async createPreference(
    @ActiveUser() activeUser: ActiveUserInterface,
    @Body() foodOnCart: FoodOnCart[],
  ) {
    return await this.paymentsService.createPreference(activeUser, foodOnCart);
  }
}
