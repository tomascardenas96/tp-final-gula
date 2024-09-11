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
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CreateFoodDto } from './dto/create-food.dto';

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

  describe('createNewFood', () => {
    it('should call foodService.createNewFood with correct parameters', async () => {
      //mock de los parametros a utilizar
      const file: Express.Multer.File={filename:'test.jpg'} as any;

      const mockNewFood: CreateFoodDto = {
        description: 'Pizza',
        price: '10',
        stock: '5',
        review: 'Delicious!',
        category: 'Italian',
      };
      const mockActiveUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
      const mockShopProfile = 'pizzashop';
      //mock del resultado esperado al utilizar el metodo
      const result: Food = {
        foodId: 1,
        description: 'Test food',
        price: 10,
        stock: 5,
        review: 'Delicious',
        category:{description:'category'}as Category,
        shop: {name:'pizzashop'} as Shop,
        image: file.filename,
        cart: [],
      };
      //configuracion: al llamar al metodo del servicio debe crear una comida
      jest.spyOn(service, 'createNewFood').mockImplementation(async()=>result);
      //esperamos que el controlador use los parametros correctos para llamar al servicio
      expect(await controller.createNewFood(file, mockNewFood, mockActiveUser, mockShopProfile)).toBe(result);
      //esperamos que el servicio sea llamado con los parametros correctos
      expect(service.createNewFood).toHaveBeenCalledWith(file, mockShopProfile, mockNewFood, mockActiveUser);
    });
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
          shippingCost:20,
          food: [],
          createdAt: new Date(),
          user: new User(),
          post: [],
          invoice: []
        },
        category: {
          categoryId: 1,
          description:'testDescription',
          icon:'link',
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
          shippingCost:20,
          food: [],
          createdAt: new Date(),
          user: new User(),
          post: [],
          invoice: [],
        }, 
        category: { categoryId: 1, description: 'Italian',icon:'link', food: [] },
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

  describe('findAllFoods', () => {
    it('should call foodService.findAllFoods', async () => {
      //configuracion: espiamos al servicio y esperamos que se resuleva con un array
      const findAllFoodsSpy = jest.spyOn(service, 'findAllFoods').mockResolvedValue([]);
      //llamamos al metodo desde el controlador
      await controller.findAllFoods();  
      //espeamos que el metodo findAllFoods haya sido llamado 
      expect(findAllFoodsSpy).toHaveBeenCalled();
    });//final it
  }); //final describe

  describe('findFoodsByCategoryId', () => {
    it('should call foodService.findFoodsByCategoryId with correct parameters', async () => {
      //mock del parametro a utilizar
      const categoryId = 1;
      //configuracion: llamado al metodo del servicio, debe resolver con un array
      const findFoodsByCategoryIdSpy = jest.spyOn(service, 'findFoodsByCategoryId').mockResolvedValue([]);
      //pasamos el parametro correcto al metodo del controlador
      await controller.findFoodsByCategoryId(categoryId);
      //esperamos que el servicio sea llamado con el parametro correcto
      expect(findFoodsByCategoryIdSpy).toHaveBeenCalledWith(categoryId);
    });//final it
  });//final describe

  describe('findFoodsByShopId',()=>{
    it('should call foodService.findFoodsByShopId with the correct parameters',async()=>{
      //mock del parametro a utilizar
      const shopId=1;
      //configuracion: llamado al servicio debe devolver un array
      jest.spyOn(service,'findFoodsByshopyId').mockResolvedValue([]);

      //pasamos el parametro correcto al metodo del controllador
      await controller.findFoodsByshopId(shopId);
      //esperamos que el servicio sea llmaado con el parametro correcto
      expect(service.findFoodsByshopyId).toHaveBeenCalledWith(shopId);
    });
  });//final describe
});//final