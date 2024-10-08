import { Injectable, BadGatewayException } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { GulaSocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class WebhookService {
  constructor(
    private readonly foodOnCartService: FoodOnCartService,
    private readonly cartService: CartService,
    private readonly invoiceService: InvoiceService,
    private readonly socketsGateway: GulaSocketGateway,
  ) {}

  async handleWebhook(webHookData: any) {
    try {
      if (webHookData.data) {
        const paymentId = webHookData.data.id;
        const paymentDetails = await this.getPaymentDetails(paymentId);
        const activeCartId = Number(paymentDetails.external_reference);

        const cart = await this.cartService.findCartById(activeCartId);

        //Generamos la factura, restamos stock y eliminamos todos los productos del carrito (En caso de aprobada la compra).
        if (cart && paymentDetails.status_detail === 'accredited') {
          await this.foodOnCartService.subtractStockOfFoodsByActiveCart(cart);
          await this.invoiceService.generateInvoice(cart);
          await this.foodOnCartService.clearCart(cart);
          this.socketsGateway.handleFinishPurchase(cart);
        } else if (cart && paymentDetails.status_detail !== 'accredited') {
          this.socketsGateway.handleFailedPurchase(cart);
        }
      }
    } catch (error) {
      throw new BadGatewayException(
        'Web hook service: Error handling web hook - handleWebhook method',
      );
    }
  }

  private async getPaymentDetails(paymentId: string) {
    try {
      const accessToken = process.env.ACCESS_TOKEN_MP;

      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    } catch (error) {
      throw new BadGatewayException(
        'Web hook service: Error getting payment details - getPaymentDetails method',
      );
    }
  }
}
