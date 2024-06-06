import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
//agrego importaciones
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

describe('CartController', () => {
  let controller: CartController;
  let service:CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService,
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    service=module.get<CartService>(CartService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
