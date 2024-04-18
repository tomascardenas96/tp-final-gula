import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa getRepositoryToken desde @nestjs/typeorm
import { User } from './entities/user.entity';
import { ProfileService } from '../profile/profile.service';
import { CartService } from '../cart/cart.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const userRepositoryMock = {
      create: jest.fn(),
      findOne: jest.fn(),
    };

    const profileServiceMock = {
      // Define los métodos que necesitas en tu mock de ProfileService
    };

    const cartServiceMock = {
      // Define los métodos que necesitas en tu mock de CartService
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: ProfileService,
          useValue: profileServiceMock,
        },
        {
          provide: CartService,
          useValue: cartServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});