import {
  Injectable,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

@Injectable()
export class PaymentsService {
  private client: MercadoPagoConfig;

  constructor(private readonly foodOnCartService: FoodOnCartService) {
    this.client = new MercadoPagoConfig({
      accessToken:
        'APP_USR-810930147163107-062820-93846a0b66fe38044f4dc1e08ea563a1-1876641655',
    });
  }

  async createPreference(activeUser: ActiveUserInterface): Promise<any> {
    try {
      const foodOnCart: FoodOnCart[] =
        await this.foodOnCartService.getFoodsByActiveCart(activeUser);

      if (foodOnCart.length === 0) {
        throw new BadRequestException(
          'Payments service: to make a purchase is needed to have at least 1 item in the cart - createPreference method',
        );
      }

      const preference = new Preference(this.client);

      const items = foodOnCart.map((item) => ({
        id: item.food.foodId.toString(),
        title: item.food.description,
        quantity: item.amount,
        unit_price: item.food.price,
        currency_id: 'ARS',
        picture_url: item.food.image,
        description: item.food.description,
      }));

      const preferenceData = {
        body: {
          items,
          back_urls: {
            success: 'https://localhost:5173/home',
            failure: 'https://your-site.com/failure',
            pending: 'https://your-site.com/pending',
          },
          auto_return: 'approved',
          notification_url: 'https://your-site.com/notifications',
          statement_descriptor: 'Gula',
        },
      };

      const response = await preference.create(preferenceData);

      return response;
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new BadGatewayException(
        'Payments service: error creating the preference - createPreference method',
      );
    }
  }
}
