import { Test, TestingModule } from '@nestjs/testing';
import { FoodService } from './food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(async () => {
    const foodRepositoryMock={
      create:jest.fn(),
      findFoodByQuery:jest.fn(),
    };
    //preguntar tomy si aca van las relaciones de la entidad? como hicimos en user.service.spec

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
      {
        provide:getRepositoryToken(Food),
        useValue:foodRepositoryMock,
      },
        //en caso de que vayan agregamos aca los provider y sue value de cada uno
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
