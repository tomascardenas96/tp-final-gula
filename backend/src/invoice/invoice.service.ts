import {
  Injectable,
  NotFoundException,
  BadGatewayException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CartService } from 'src/cart/cart.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly userService: UserService,
    private readonly foodOnCartService: FoodOnCartService,
    private readonly cartService: CartService,
  ) {}

  async getAll(): Promise<Invoice[]> {
    try {
      return await this.invoiceRepository.find();
    } catch (error) {
      throw new HttpException(
        'No se pudo acceder a la información de las facturas en la base de datos',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async generateInvoice(cart: Cart) {
    try {
      const user = await this.userService.getActiveUserByCart(cart);
      const foodOnCart =
        await this.foodOnCartService.getFoodsByActiveCart(user);
      const invoiceNumber = await this.generateInvoiceNumber();

      if (!foodOnCart || foodOnCart.length === 0) {
        throw new NotFoundException(
          'No se encontraron productos en el carrito',
        );
      }

      //Agregar logica para numero de factura.
      for (const foods of foodOnCart) {
        const newInvoice = this.invoiceRepository.create({
          invoiceNumber: invoiceNumber,
          foodId: foods.food.foodId,
          foodDescription: foods.food.description,
          foodAmount: foods.amount,
          foodUnitaryPrice: foods.food.price,
          cart,
          shop: foods.food.shop,
        });
        await this.invoiceRepository.save(newInvoice);
      }

      return {
        message: 'Invoice generated succesfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; //relanza excepciones conocidas
      }
      //lanza una excepcion generaica si ocurre cualquier otro error
      throw new HttpException(
        'Error al generar la factura',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Este metodo genera un numero de factura correlativo.
  async generateInvoiceNumber(): Promise<string> {
    try {
      const allInvoices = await this.getAll();
      let highestInvoiceNumber: number;

      // Si no hay facturas en la base de datos, comenzamos desde 1
      if (!allInvoices || allInvoices.length === 0) {
        highestInvoiceNumber = 0;
      } else {
        // Encontrar el número de factura más alto
        highestInvoiceNumber = Math.max(
          ...allInvoices.map((invoice) => {
            const invoiceNumber = parseInt(invoice.invoiceNumber.split(' ')[1]);
            return invoiceNumber;
          }),
        );
      }

      // Incrementar el número de factura más alto en 1
      const nextInvoiceNumber = highestInvoiceNumber + 1;

      // Formatear el número de factura con ceros a la izquierda
      const formattedInvoiceNumber = `C001 ${nextInvoiceNumber
        .toString()
        .padStart(8, '0')}`;

      return formattedInvoiceNumber;
    } catch (error) {
      //lanza excepcionn si ocurre un error al generar el num de factura
      throw new HttpException(
        'Error al generar el numero de factura',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInvoicesByActiveUser(
    activeUser: ActiveUserInterface,
  ): Promise<Invoice[]> {
    try {
      const user: User = await this.userService.getActiveUser(activeUser);
      const cart: Cart = await this.cartService.getActiveCart(user);

      return this.invoiceRepository.find({ where: { cart } });
    } catch (error) {
      throw new BadGatewayException(
        'Invoice service: error getting invoices - getInvoicesByActiveUser method',
      );
    }
  }
}
