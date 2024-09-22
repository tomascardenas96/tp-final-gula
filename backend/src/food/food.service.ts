import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { ILike, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { ShopService } from 'src/shop/shop.service';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    private readonly categoryService: CategoryService,
    private readonly shopService: ShopService,
  ) {}

  async createNewFood(
    file: Express.Multer.File,
    shopProfile: string,
    newFood: CreateFoodDto,
    activeUser: ActiveUserInterface,
  ): Promise<Food> {
    try {
      const shop: Shop =
        await this.shopService.getShopByProfileName(shopProfile);

      if (!shop) {
        throw new NotFoundException(
          'Food service: shop non-existent - createNewFood method',
        );
      }

      const category: Category = await this.categoryService.findCategoryByName(
        newFood.category,
      );

      if (!category) {
        throw new NotFoundException(
          'Food service: category non-existent - createNewFood method',
        );
      }

      //Para verificar que el usuario activo sea propietario del negocio desde el cual quiere publicar un nuevo plato.
      if (activeUser.email !== shop.user.email) {
        throw new BadRequestException(
          'Food service: active user must be shop owner to create a new food - createNewFood method',
        );
      }

      //Si el usuario carga una foto se va a cambiar el nombre en la base de datos, si no carga simplemente se envia el valor como nulo. (La base de datos admite la imagen como nulo, ya que genera una imagen por defecto)
      //Nota: price y stock llega como string via form data(Necesario para poder enviar los datos necesarios del body, junto con la foto), pero se convierte en number antes de realizar el guardado.
      const food: Food = this.foodRepository.create({
        ...newFood,
        shop,
        category,
        price: Number(newFood.price),
        stock: Number(newFood.stock),
        image: file ? file.filename : null,
      });

      return this.foodRepository.save(food);
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }

      throw new BadGatewayException(
        'Food service: error creating new food - createNewFood method',
      );
    }
  }

  findFoodByQuery(query: string): Promise<Food[]> {
    try {
      return this.foodRepository.find({
        where: { description: ILike(`%${query}%`), stock: MoreThan(0) },
        relations: ['shop'],
      });
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  async findFoodByShopAndCategory(
    profilename: string,
    category: string,
  ): Promise<Food[]> {
    try {
      const foundCategory: Category =
        await this.categoryService.findCategoryByName(category);

      if (!foundCategory) {
        throw new NotFoundException(
          'Food service: non-existent category - findFoodByCategory method',
        );
      }
      const shop: Shop =
        await this.shopService.getShopByProfileName(profilename);

      if (!shop) {
        throw new NotFoundException(
          'Food service: non-existent shop - findFoodByCategory method',
        );
      }

      return this.foodRepository.find({
        where: { category: foundCategory, shop: shop },
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException(
        'Food service: error getting food by category - findFoodByCategory method',
      );
    }
  }

  findFoodById(foodId: number) {
    try {
      return this.foodRepository.findOne({ where: { foodId } });
    } catch (err) {
      throw new BadGatewayException(
        'Food service: error finding food by id - findFoodById method',
      );
    }
  }

  //Metodo de Gaston Nro 1:
  //Trae todas las opciones de comida disponible.
  async findAllFoods(): Promise<Food[]> {
    try {
      return await this.foodRepository.find();
    } catch (err) {
      throw new ForbiddenException('Food service: error getting all foods');
    }
  }

  //Metodo de Gaston Nro 2:
  // Método para encontrar alimentos por categoryId.
  //Esto lo uso para discriminar las comidas por categorias, para  usarla en el slider de iconos de comidas y que te traiga, por ejemplo las opciones de la categoria Pizzas.
  async findFoodsByCategoryId(categoryId: number): Promise<Food[]> {
    try {
      return await this.foodRepository.find({
        where: { category: { categoryId } }, // Uso correcto de la relación
        relations: ['shop', 'category'],
      });
    } catch (err) {
      throw new ForbiddenException(
        'Food service: error getting foods by categoryId',
      );
    }
  }

  //Metodo de Gaston Nro 3:
  // Método para encontrar alimentos por shopId.
  // Este metodo trae las comidas disponibles de cada lugar, para ser mostradas en el slider de lugares.
  async findFoodsByshopyId(shopId: number): Promise<Food[]> {
    try {
      return await this.foodRepository.find({
        where: { shop: { shopId } },
        relations: ['shop'],
      });
    } catch (err) {
      throw new ForbiddenException(
        'Food service: error getting foods by shopId',
      );
    }
  }

  async filterFood(name?: string, category?: string, maxprice?: number) {
    try {
      const whereConditions: any = {};

      if (name) {
        whereConditions.description = ILike(`%${name}%`);
      }

      if (category) {
        const categoryFiltered =
          await this.categoryService.findCategoryByName(category);
        whereConditions.category = categoryFiltered;
      }

      if (maxprice) {
        const parsedPrice = Number(maxprice);
        whereConditions.price = LessThanOrEqual(parsedPrice);
      }

      return this.foodRepository.find({ where: whereConditions });
    } catch (error) {
      throw new BadGatewayException(
        'Error trying to filter food',
        error.message,
      );
    }
  }

  async findFoodsById(foodsId: number[]) {
    try {
      const foods = [];
      for (const food of foodsId) {
        const addFood = await this.foodRepository.find({
          where: { foodId: food },
        });
        foods.push(addFood);
      }

      return foods;
    } catch (error) {
      throw new Error('Error while find foods by id');
    }
  }

  async subtractFromStockAfterPurchase(foodOnCart: FoodOnCart[]) {
    try {
      const foodIds = foodOnCart.map((item) => item.food.foodId);

      //Aplanamos el objeto que nos llega, para poder iterarlo correctamente.
      const foods = (await this.findFoodsById(foodIds)).flat();

      for (const food of foods) {
        const item = foodOnCart.find((i) => i.food.foodId === food.foodId);
        if (food.stock < item.amount) {
          throw new BadRequestException(
            `Not enough stock for ${food.description}`,
          );
        }

        food.stock -= item.amount;
      }

      await this.foodRepository.save(foods);

      return { message: 'stock subtracted' };
    } catch (error) {
      // Si el error es un BadRequestException, lo volvemos a lanzar tal como está
      if(error instanceof BadRequestException){
        throw error;
      } 
      //cualquier otro error sera manejado con un badGatewayException
      throw new BadGatewayException(
        'Error trying to subtract stock after purchase',
      );
    }
  }
}