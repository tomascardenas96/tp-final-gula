import {
  Injectable,
  ForbiddenException,
  BadGatewayException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllCategories() {
    try {
      return this.categoryRepository.find();
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  findCategoryByName(description: string) {
    try {
      return this.categoryRepository.findOne({ where: { description } });
    } catch (err) {
      throw new BadGatewayException(
        'Category service: error getting category by name - findCategoryByName method',
      );  
    }
  }
}
