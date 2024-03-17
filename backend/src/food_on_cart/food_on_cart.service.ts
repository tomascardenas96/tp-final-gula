import { Injectable } from '@nestjs/common';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { UpdateFoodOnCartDto } from './dto/update-food_on_cart.dto';

@Injectable()
export class FoodOnCartService {
  create(createFoodOnCartDto: CreateFoodOnCartDto) {
    return 'This action adds a new foodOnCart';
  }

  findAll() {
    return `This action returns all foodOnCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodOnCart`;
  }

  update(id: number, updateFoodOnCartDto: UpdateFoodOnCartDto) {
    return `This action updates a #${id} foodOnCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodOnCart`;
  }
}
