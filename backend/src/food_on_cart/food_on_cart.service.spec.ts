import { Test, TestingModule } from '@nestjs/testing';
import { FoodOnCartService } from './food_on_cart.service';
import { CartService } from 'src/cart/cart.service';
import { UserService } from 'src/user/user.service';
import { FoodService } from 'src/food/food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { Food } from 'src/food/entities/food.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { ShopService } from 'src/shop/shop.service';
import { Shop } from 'src/shop/entities/shop.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

describe('FoodOnCartService', () => {
  let service: FoodOnCartService;
  let foodOnCartServiceMock:any;

  const baseFoodOnCartService={
    create:jest.fn(),
    save:jest.fn()
  };

  foodOnCartServiceMock={
    ...baseFoodOnCartService,
    addFoodOnCart:jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodOnCartService,
        CartService,
        UserService,
        FoodService,
        ProfileService,
        ShopService,
        CategoryService,
        {
          provide:getRepositoryToken(FoodOnCart),
          useValue:foodOnCartServiceMock,
        },
        {
          provide:getRepositoryToken(Cart),
          useValue:CartService
        },
        {
          provide:getRepositoryToken(User),
          useValue:UserService
        },
        {
          provide:getRepositoryToken(Food),
          useValue:FoodService 
        },
        {
          provide:getRepositoryToken(Profile),
          useValue:ProfileService 
        },
        {
          provide:getRepositoryToken(Shop),
          useValue:ShopService 
        },
        {
          provide:getRepositoryToken(Category),
          useValue:CategoryService 
        }
      ],
    }).compile();

    service = module.get<FoodOnCartService>(FoodOnCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); 
});
