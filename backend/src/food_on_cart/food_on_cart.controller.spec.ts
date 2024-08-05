import { Test, TestingModule } from '@nestjs/testing';
import { FoodOnCartController } from './food_on_cart.controller';
import { FoodOnCartService } from './food_on_cart.service';
import { CartService } from 'src/cart/cart.service';
import { UserService } from 'src/user/user.service';
import { FoodService } from 'src/food/food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { Food } from 'src/food/entities/food.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { ShopService } from 'src/shop/shop.service';
import { Shop } from 'src/shop/entities/shop.entity';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { GulaSocketGateway } from 'src/socket/socket.gateway';
import { AddOrSubtractProductDto } from './dto/add-subtract.dto';

describe('FoodOnCartController', () => {
  let controller: FoodOnCartController;
  let service:FoodOnCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodOnCartController],
      providers: [
        FoodOnCartService,
        CartService,
        UserService,
        FoodService,
        ProfileService,
        CategoryService,
        ShopService,
        JwtService, 
        GulaSocketGateway,
        {
          provide:getRepositoryToken(FoodOnCart),//obtenemos el token del repositorio de foodOnCart
          useClass:Repository//simula un repositorio, se pdoria usar un mock
        },
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(User),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Food),
          useClass:Repository
        },
        { provide:getRepositoryToken(Profile),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Category),
          useClass:Repository 
        },
        {
          provide:getRepositoryToken(Shop),
          useClass:Repository
        }],
    }).compile();

    controller = module.get<FoodOnCartController>(FoodOnCartController);
    service= module.get<FoodOnCartService>(FoodOnCartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addFoodOnCart',()=>{
    it('should call addFoodOnCart.service method with the correct parameters',async()=>{
      //mock de los parametros qeu se usan para llamar al metodo
      const activeUser:ActiveUserInterface={
        userId:1,
        email: 'test@example.com',
        name: 'Test User',
      };

      const foodOnCartDto:CreateFoodOnCartDto={
        food: 1,
        amount: 2,
      };
      //mock del obejto esperado:
      const result={
        foodOnCartId: 1,//Id de la comida en el carrito 
          amount: 2,//cantidad de comidas en el carrito
          cart: { //carrito perteneciente a un usuario activo
            cartId: 1,
            user: activeUser,
            food: [],//comidas en el carrito
            invoice: [],//facturas asociadas al carrito
          },
          food: { //comida dentro del carrito
            foodId: 1,
            description: 'Test food',
            price: 10,
            stock: 5,
            review: 'Delicious',
            category: null,
            shop: null,
            image: null,
            cart: [],
          } ,
        };
      //configuracion del test:
        jest.spyOn(service,'addFoodOnCart').mockResolvedValue(result);

      //verificamos que si el controllador recibe los parrametros correctos lleve al resultado esperado
      expect(await controller.addFoodOnCart(activeUser,foodOnCartDto)).toBe(result)  

      //verificamos que el servicio sea llamado con los parametros correctos
      expect(service.addFoodOnCart).toHaveBeenCalledWith(activeUser,foodOnCartDto);
    });
  });//final decribe

  describe('getFoodsByActiveCart',()=>{
    it('should call getFoodsByActiveCart.Service with correct parameters', async () => {
      //mock del parametro a usar
      const mockActiveUser: ActiveUserInterface = { userId: 1, email: 'test@example.com', name: 'Test User' };
      //mock del resultado esperado
      const result:FoodOnCart[]=[{
        foodOnCartId: 1,//Id de la comida en el carrito 
          amount: 2,//cantidad de comidas en el carrito
          cart: { //carrito perteneciente a un usuario activo
            cartId: 1,
            user: new User,
            food: [],//comidas en el carrito
            invoice: [],//facturas asociadas al carrito
          },
          food: { //comida dentro del carrito
            foodId: 1,
            description: 'Test food',
            price: 10,
            stock: 5,
            review: 'Delicious',
            category: null,
            shop: null,
            image: null,
            cart: [],
          } ,}]; // Mockear según la estructura de tu entidad Food
      //configuracion del test:
      //el servicio debe resolver con un array de foodOnCart
      jest.spyOn(service, 'getFoodsByActiveCart').mockResolvedValue(result);
      //llamado al controllador con los parametros correctos
      await controller.getFoodsByActiveCart(mockActiveUser);
      //verificamos que el controllador llama al servicio con los parametros correctos
      expect(service.getFoodsByActiveCart).toHaveBeenCalledWith(mockActiveUser);
    });
  })

  describe('addOrSubtractProduct',()=>{
     it('should call the addOrSubtractProduct method of the service and return the result', async () => {
      const addOrSubtractDto: AddOrSubtractProductDto = {
        option: 'add',
        food: { foodId: 1, description: 'Pizza', price: 10 } as Food,
      };

      const activeUser: ActiveUserInterface = { userId: 1, email: 'test@example.com', name:'testUser' };

      const result = { amount: 2 } as FoodOnCart;

      jest.spyOn(service, 'addOrSubtractProduct').mockResolvedValue(result);

      const response = await controller.addOrSubtractProduct(addOrSubtractDto, activeUser);

      expect(response).toBe(result);
      expect(service.addOrSubtractProduct).toHaveBeenCalledWith(addOrSubtractDto, activeUser);
    });

    it('should handle errors thrown by the service', async () => {
      const addOrSubtractDto: AddOrSubtractProductDto = {
        option: 'add',
        food: { foodId: 1, description: 'Pizza', price: 10 } as Food,
      };

      const activeUser: ActiveUserInterface = { userId: 1, email: 'test@example.com', name:'testUser' };

      jest.spyOn(service, 'addOrSubtractProduct').mockRejectedValue(new Error('Service error'));

      try {
        await controller.addOrSubtractProduct(addOrSubtractDto, activeUser);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Service error');
      }
    });
  });//final describe

  describe('getAllFoodOnCart', () => {
    it('should return all food on cart', async () => {
      
      //mock del objeto a retornar
      const mockFoodOnCart = [
        {
          foodOnCartId: 1,
          amount: 2,
          cart: {
            cartId: 1,
            user: {
              userId: 1,
              email: 'test@example.com',
              name: 'Test User',
              password: 'password123',
              createdAt: new Date(),
              shop: [],
              cart: null,
              profile: null,
            },
            food: [],
            invoice: [],
          } as Cart,
          food: {
            foodId: 1,
            description: 'Test food',
            price: 10,
            stock: 5,
            review: 'Delicious',
            category: null,
            shop: null,
            image: null,
            cart: [],
          } as Food,
        },
      ];
      //configuracion del test: 
      //al usar el metodo del servicio debe resolver retornando un array de comidas que hay dentro de un carrito
      jest.spyOn(service, 'getAllFoodOnCart').mockResolvedValue(mockFoodOnCart);
      //verificamos que el resultado es el esperado
      expect(await controller.getAllFoodOnCart()).toBe(mockFoodOnCart);
      //verificamos que el servicio es llamado
      expect(service.getAllFoodOnCart).toHaveBeenCalled();
    });
  });
});
