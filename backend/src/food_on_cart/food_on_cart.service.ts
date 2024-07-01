import {
  Injectable,
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CartService } from 'src/cart/cart.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/entities/food.entity';
import { GulaSocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class FoodOnCartService {
  constructor(
    @InjectRepository(FoodOnCart)
    private readonly foodOnCartRepository: Repository<FoodOnCart>,
    private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly foodService: FoodService,
    private readonly socketGateway: GulaSocketGateway,
  ) {}

  //Metodo para agregar un producto al carrito
  async addFoodOnCart(
    activeUser: ActiveUserInterface,
    foodOnCartDto: CreateFoodOnCartDto,
  ): Promise<any> {
    try {
      // Primero buscamos al usuario activo.
      const user: User = await this.userService.getActiveUser(activeUser);

      if (!user) {
        throw new NotFoundException(
          'Food_on_cart service: user not found - addFoodOnCart method',
        );
      }

      // Luego buscamos la comida que el usuario quiere agregar al carrito.
      const food: Food = await this.foodService.findFoodById(
        foodOnCartDto.food,
      );

      if (!food) {
        throw new NotFoundException(
          'Food_on_cart service: food not found - addFoodOnCart method',
        );
      }

      // Buscamos el carrito activo, utilizando al usuario activo como parametro.
      const cart: Cart = await this.cartService.getActiveCart(user);

      if (!cart) {
        throw new NotFoundException(
          'Food_on_cart service: cart not found - addFoodOnCart method',
        );
      }

      //Verificamos si la comida ya existe en el carrito, en caso positivo, no creara un nuevo objeto sino que le sumara 1 unidad a la comida ya agregada.
      const existentFoodOnCart = await this.foodOnCartRepository.findOne({
        where: { food: food, cart: cart },
      });

      if (existentFoodOnCart) {
        existentFoodOnCart.amount = existentFoodOnCart.amount + 1;

        //Socket que envia al frontend el evento de aumento en la cantidad de determinada comida.
        this.socketGateway.handleAddFoodExistentInCart(existentFoodOnCart);

        const newFoodAmount =
          await this.foodOnCartRepository.save(existentFoodOnCart);

        return newFoodAmount;
      }

      // Y en caso de negativo creara automaticamente el objeto con los datos anteriormente recolectados.
      const newFoodOnCart: FoodOnCart = this.foodOnCartRepository.create({
        ...foodOnCartDto,
        cart,
        food,
      });

      //Socket que envia al frontend el evento de agregar un nuevo producto al carrito.
      this.socketGateway.handleAddFoodInCart(newFoodOnCart);

      return this.foodOnCartRepository.save(newFoodOnCart);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException(
        'FoodOnCartService: error adding food on cart - addFoodOnCart method',
      );
    }
  }

  //Metodo utilizado en el servicio de Payments.
  async getFoodsByActiveCart(
    activeUser: ActiveUserInterface,
  ): Promise<FoodOnCart[]> {
    try {
      const user = await this.userService.getActiveUser(activeUser);
      const cart = await this.cartService.getActiveCart(user);

      const foodsByCart: FoodOnCart[] = await this.foodOnCartRepository.find({
        where: { cart },
        relations: ['food'],
      });

      return foodsByCart;
    } catch (err) {
      throw new BadGatewayException(
        'FoodOnCartService: error getting foods by active cart - getFoodsByActiveCart method',
      );
    }
  }

  //Metodo para limpiar el carrito una vez exitosa la compra.
  async clearCart(activeUser: ActiveUserInterface): Promise<DeleteResult> {
    try {
      const user = await this.userService.getActiveUser(activeUser);
      const cart = await this.cartService.getActiveCart(user);

      return this.foodOnCartRepository.delete({ cart });
    } catch (err) {
      throw new BadGatewayException(
        'FoodOnCartService: error cleaning active cart - clearCart method',
      );
    }
  }

  //Metodo para agregar o quitar una unidad a la cantidad total de cada producto.
  async addOrSubtractProduct(
    option: string,
    food: Food,
    activeUser: ActiveUserInterface,
  ) {
    try {
      const user = await this.userService.getActiveUser(activeUser);
      const cart = await this.cartService.getActiveCart(user);

      //Trae la comida que esta dentro del carrito activo para modificar sus cantidades.
      const foodOnCart = await this.foodOnCartRepository.findOne({
        where: { food, cart },
      });

      if (option === 'subtract') {
        if (foodOnCart.amount === 1) {
          return;
        }
        foodOnCart.amount = foodOnCart.amount - 1;
      }
      if (option === 'add') {
        foodOnCart.amount = foodOnCart.amount + 1;
      }

      const newAmount = await this.foodOnCartRepository.save(foodOnCart);

      this.socketGateway.handleAddOrSubtractFood(newAmount);

      return newAmount;
    } catch (err) {
      throw new BadGatewayException(
        'Food on cart service: error modifing food on cart quantity - addOrSubtractProduct method',
      );
    }
  }
}
