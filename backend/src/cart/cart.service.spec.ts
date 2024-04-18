import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
//agrego importaciones
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

describe('CartService', () => {
  let service: CartService;
  let repository:Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService,
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    repository=module.get<Repository<Cart>>(getRepositoryToken(Cart))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
