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
import { AddOrSubtractProductDto } from './dto/add-subtract.dto';

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
  async getFoodsByActiveUser(
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
        'FoodOnCartService: error getting foods by active cart - getFoodsByActiveUser method',
      );
    }
  }

  async subtractStockOfFoodsByActiveCart(cart: Cart) {
    try {
      const foodOnCart: FoodOnCart[] = await this.foodOnCartRepository.find({
        where: { cart },
      });


      return await this.foodService.subtractFromStockAfterPurchase(foodOnCart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Metodo para limpiar el carrito una vez exitosa la compra.
  async clearCart(cart: Cart): Promise<DeleteResult> {
    try {
      return this.foodOnCartRepository.delete({ cart });
    } catch (err) {
      throw new BadGatewayException(
        'FoodOnCartService: error cleaning active cart - clearCart method',
      );
    }
  }

  //Metodo para agregar o quitar una unidad a la cantidad total de cada producto.
  async addOrSubtractProduct(
    { option, food }: AddOrSubtractProductDto,
    activeUser: ActiveUserInterface,
  ) {
    try {
      const user = await this.userService.getActiveUser(activeUser);
      const cart = await this.cartService.getActiveCart(user);
      const foodToChange = await this.foodService.findFoodById(food.foodId);

      //Trae la comida que esta dentro del carrito activo para modificar sus cantidades.
      const foodOnCart = await this.foodOnCartRepository.findOne({
        where: { cart, food: foodToChange },
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

      // Socket que enviara los nuevos cambios al frontend cuando se sume o reste una unidad de un producto.
      this.socketGateway.handleAddOrSubtractFood(newAmount);

      return newAmount;
    } catch (err) {
      throw new BadGatewayException(
        'Food on cart service: error modifing food on cart quantity - addOrSubtractProduct method',
      );
    }
  }

  //Metodo de gaston Nro. 4:
  //Este metodo trae todo lo que haya en la tabla food_on_cart, a fin de poder mostrado en la columna de pedidos.
  async getAllFoodOnCart(): Promise<FoodOnCart[]> {
    return this.foodOnCartRepository.find({
      relations: ['cart', 'food'],
    });
  }
  //Metodo de gaston Nro. 5:
  // Nuevo metodo para eliminar todos los registros de food_on_cart
  async deleteAllFoodOnCart(): Promise<void> {
    await this.foodOnCartRepository.clear();
  }

  //Metodo de gaston Nro. 6:
  // Nuevo metodo para eliminar un registro por su foodOnCartId
  async deleteFoodOnCartById(foodOnCartId: number): Promise<void> {
    const result = await this.foodOnCartRepository.delete(foodOnCartId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Food_on_cart service: food_on_cart with ID ${foodOnCartId} not found - deleteFoodOnCartById method`,
      );
    }
  }
}
