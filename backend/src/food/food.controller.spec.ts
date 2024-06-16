import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CartService } from 'src/cart/cart.service';
import { ShopService } from 'src/shop/shop.service';
import { CategoryService } from 'src/category/category.service';
import { ProfileService } from 'src/profile/profile.service';
import { Shop } from 'src/shop/entities/shop.entity';
import { Category } from 'src/category/entities/category.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { JwtService } from '@nestjs/jwt';

describe('FoodController', () => {
  let controller: FoodController;
  let service:FoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [FoodService,
          ShopService,
          CategoryService,
          UserService,
          CartService,
          ProfileService,
          JwtService,
        {
          provide:getRepositoryToken(Food),//obtenemos el token del repositorio de food
          useClass:Repository,//simula un repositorio, se pdoria usar un mock
        },
        {
          provide:getRepositoryToken(Shop),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Category),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(User),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Profile),
          useClass:Repository
        }, 
      ],
    }).compile();

    controller = module.get<FoodController>(FoodController);
    service= module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findFoodByQuery',()=>{
    it('should call foodService.findFoodbyQuery with the correct parameters',async ()=>{
      const food=' pizza';
      const result: Food[] = [{
        foodId: 1,
        description: 'Delicious pizza',
        price: 10,
        stock: 5,
        image: 'pizza.jpg',
        review: 'Tasty!',
        shop: {
          shopId: 1,
          name: 'Pizza Shop',
          location: 'testLocation',
          phone: 'phoneNumber',
          profilename: 'pizzashop',
          picture: 'shop.jpg',
          food: [],
          createdAt: new Date(),
          user: new User(),
          post: [],
          invoice: []
        },
        category: {
          categoryId: 1,
          description:'testDescription',
          food: []
        },
        cart: [] 
      }];
      //configuracion de la prueba
      //llamo y espio al metodo del servicio y debe resolver con un objeto food
      jest.spyOn(service,'findFoodByQuery').mockResolvedValue(result);

      const response= await controller.findFoodByQuery(food);

      expect(service.findFoodByQuery).toHaveBeenCalledWith(food);
      expect(response).toEqual(result);
    });//final it
  });//finald escribe

  describe('findFoodByShopAndCategory',()=>{
    it('should call foodService.findFoodByShopAndCategory with the correct parameters',async ()=>{
      const profilename = 'pizzashop';
      const category = 'Italian';
      const result: Food[] = [{
        foodId: 1,
        description: 'Delicious pizza',
        price: 10,
        stock: 5,
        image: 'pizza.jpg',
        review: 'Tasty!',
        shop: {
          shopId: 1,
          name: 'Pizza Shop',
          location: 'testLocation',
          phone: 'phoneNumber',
          profilename: 'pizzashop',
          picture: 'shop.jpg',
          food: [],
          createdAt: new Date(),
          user: new User(),
          post: [],
          invoice: [],
        }, 
        category: { categoryId: 1, description: 'Italian', food: [] },
        cart: [],
      }];
      //espiamos el metodo del servicio y le indicamos que tiene que resolver con un food
      jest.spyOn(service, 'findFoodByShopAndCategory').mockResolvedValue(result);
      //llamamos al controllador con los aprametros correctos
      const response = await controller.findFoodByShopAndCategory(profilename, category);
      //esperamos que se haya llamado al emtodo del servicio con los parametros correctos
      expect(service.findFoodByShopAndCategory).toHaveBeenCalledWith(profilename, category);
      //esperamos qeu la respuesta sea un food
      expect(response).toEqual(result);
    });//final it
  });//final decribe
});