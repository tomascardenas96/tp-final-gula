import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UserService } from 'src/user/user.service';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly userService: UserService,
    private readonly foodOnCartService: FoodOnCartService,
  ) {}

  getAll():Promise<Invoice[]> {
    try {
      return this.invoiceRepository.find();
    } catch (error) {
      throw new HttpException('No se puede acceder a la data', HttpStatus.BAD_GATEWAY);
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

      console.log(foodOnCart)

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
    } catch (error) {}
  }

  //Este metodo genera un numero de factura correlativo.
  async generateInvoiceNumber(): Promise<string> {
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
  }

  getInvoicesByUser() {}
}
