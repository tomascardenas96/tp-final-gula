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
import { ILike, MoreThan, Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { ShopService } from 'src/shop/shop.service';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';

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
}
