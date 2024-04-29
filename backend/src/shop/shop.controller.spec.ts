import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

describe('ShopController', () => {
  let controller: ShopController;
  let service: ShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopController],
      providers: [ShopService,
        {
          provide:getRepositoryToken(Shop),
          useClass:Repository
        }
      ],
    }).compile();

    controller = module.get<ShopController>(ShopController);
    service=module.get<ShopService>(ShopService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
