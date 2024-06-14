import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadGatewayException,
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

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    private readonly categoryService: CategoryService,
    private readonly shopService: ShopService,
  ) {}

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

  async findFoodByShopAndCategory(profilename: string, category: string): Promise<Food[]> {
    try {
      const foundCategory: Category =
        await this.categoryService.findCategoryByName(category);

      if (!foundCategory) {
        throw new NotFoundException(
          'Food service: non-existent category - findFoodByCategory method',
        );
      }
      const shop: Shop = await this.shopService.getShopByProfileName(profilename);

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
