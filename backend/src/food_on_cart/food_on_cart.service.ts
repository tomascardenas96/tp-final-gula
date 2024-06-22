import {
  Injectable,
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { UpdateFoodOnCartDto } from './dto/update-food_on_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CartService } from 'src/cart/cart.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/entities/food.entity';

@Injectable()
export class FoodOnCartService {
  constructor(
    @InjectRepository(FoodOnCart)
    private readonly foodOnCartRepository: Repository<FoodOnCart>,
    private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly foodService: FoodService,
  ) {}

  async addFoodOnCart(
    activeUser: ActiveUserInterface,
    foodOnCartDto: CreateFoodOnCartDto,
  ): Promise<any> {
    try {
      const user: User = await this.userService.getActiveUser(activeUser);

      if (!user) {
        throw new NotFoundException(
          'Food_on_cart service: user not found - addFoodOnCart method',
        );
      }

      const food: Food = await this.foodService.findFoodById(
        foodOnCartDto.food,
      );

      if (!food) {
        throw new NotFoundException(
          'Food_on_cart service: food not found - addFoodOnCart method',
        );
      }

      const cart: Cart = await this.cartService.getActiveCart(user);

      if (!cart) {
        throw new NotFoundException(
          'Food_on_cart service: cart not found - addFoodOnCart method',
        );
      }

      const newFoodOnCart: FoodOnCart = this.foodOnCartRepository.create({
        ...foodOnCartDto,
        cart,
        food,
      });

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
}
