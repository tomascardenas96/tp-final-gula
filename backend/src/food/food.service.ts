import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
  ) {}

  create(createFoodDto: CreateFoodDto) {
    return 'This action adds a new food';
  }

  findFoodByQuery(query: string) {
    try {
      return this.foodRepository.find({
        where: { description: ILike(`%${query}%`) },
      });
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
