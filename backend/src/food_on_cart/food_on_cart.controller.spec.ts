import { Test, TestingModule } from '@nestjs/testing';
import { FoodOnCartController } from './food_on_cart.controller';
import { FoodOnCartService } from './food_on_cart.service';

describe('FoodOnCartController', () => {
  let controller: FoodOnCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodOnCartController],
      providers: [FoodOnCartService],
    }).compile();

    controller = module.get<FoodOnCartController>(FoodOnCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
