import {
  Injectable,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { FoodOnCart } from '../food_on_cart/entities/food_on_cart.entity';

@Injectable()
export class PaymentsService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN_MP,
    });
  }

  async createPreference(foodOnCart: FoodOnCart[]): Promise<any> {
    try {
      const preference = new Preference(this.client);

      const items = foodOnCart.map((item) => ({
        id: item.food?.foodId.toString(),
        title: item.food?.description,
        quantity: item?.amount,
        unit_price: item.food?.price,
        currency_id: 'ARS',
        picture_url: item.food?.image,
        description: item.food?.description,
      }));

      const preferenceData = {
        body: {
          items,
          back_urls: {
            success: 'http://localhost:3070/home/success',
            failure: 'http://localhost:3070/home/failure',
            pending: 'http://localhost:3070/home/pending',
          },
          notification_url: `${process.env.WEBHOOK_MERCADO_PAGO}/webhook`,
          external_reference: foodOnCart[0].cart.cartId.toString(),
        },
      };

      return await preference.create(preferenceData);
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
