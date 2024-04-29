import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(async () => {
    const shopRepositorymock={
      create:jest.fn(),
      findShopByQuery:jest.fn(),
    };
    //preguntar tomy si aca van las relaciones de la entidad? como hicimos en user.service.spec
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
      {
        provide:getRepositoryToken(Shop),
        useValue:shopRepositorymock,
      }
      //en caso de que vayan agregamos aca los provider y sue value de cada uno
    ],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
