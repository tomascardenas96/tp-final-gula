import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly foodOnCartService: FoodOnCartService,
    private readonly cartService: CartService,
  ) {}

  async handleWebhook(webHookData: any) {
    try {
      if (webHookData.data) {
        const paymentId = webHookData.data.id;
        const paymentDetails = await this.getPaymentDetails(paymentId);
        const activeCartId = Number(paymentDetails.external_reference);

        const cart = await this.cartService.findCartById(activeCartId);

        await this.foodOnCartService.clearCart(cart);
      }
    } catch (error) {
    }
  }
  private async getPaymentDetails(paymentId: string) {
    try {
      const accessToken =
        'APP_USR-810930147163107-062820-93846a0b66fe38044f4dc1e08ea563a1-1876641655';

      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        // throw new Error(`Error al obtener los detalles del pago (${response.status}): ${await response.text()}`);
      }

      return await response.json();
    } catch (error) {
      
    }
  }
}
