import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  create() {
    const cart = this.cartRepository.create();
    return this.cartRepository.save(cart);
  }

  //Utilizado en el service de User, para obtener el carrito del usuario que esta activo.
  //Tambien utilizado en el service de Payments.
  async getActiveCart(user: User): Promise<Cart> {
    try {
      const activeCart: Promise<Cart> = this.cartRepository.findOne({
        where: { cartId: user.cart.cartId },
      });

      if (!activeCart) {
        throw new NotFoundException(
          'Cart service: cart not found - getActiveCart method',
        );
      }

      return activeCart;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException(
        'Cart service: error getting active user cart - getActiveCart method',
      );
    }
  }

  async findCartById(cartId: number) {
    try {
      return this.cartRepository.findOne({ where: { cartId } });
    } catch (err) {}
  }
}
