import { Test, TestingModule } from '@nestjs/testing';
import { FoodOnCartService } from './food_on_cart.service';

describe('FoodOnCartService', () => {
  let service: FoodOnCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodOnCartService],
    }).compile();

    service = module.get<FoodOnCartService>(FoodOnCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
