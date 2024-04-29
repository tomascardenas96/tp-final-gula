import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';



describe('FoodController', () => {
  let controller: FoodController;
  let service:FoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [FoodService,
        {
          provide:getRepositoryToken(Food),//obtenemos el token del repositorio de food
          useClass:Repository,//simula un repositorio, se pdoria usar un mock
        }
      ],
    }).compile();

    controller = module.get<FoodController>(FoodController);
    service= module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
