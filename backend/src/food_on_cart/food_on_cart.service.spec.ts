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
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CreateFoodOnCartDto } from './dto/create-food_on_cart.dto';
import { BadGatewayException, NotFoundException } from '@nestjs/common';



describe('FoodOnCartService', () => {
  let service: FoodOnCartService;
  let foodOnCartServiceMock:any;
  let userServiceMock:any;
  let ShopServiceMock:any;
  let ProfileServiceMock:any;
  let FoodServiceMock:any;
  let CategoryServiceMock:any;
  let cartServiceMock:any;

  const baseFoodOnCartService={
    create:jest.fn(),
    save:jest.fn(),
    find:jest.fn()
  };

  foodOnCartServiceMock={
    ...baseFoodOnCartService,
    addFoodOnCart:jest.fn(),
  };

  const baseServiceMock={
    create:jest.fn(),
    save:jest.fn(),
    findOneBy:jest.fn(),
    findOne:jest.fn(),
    find:jest.fn(),
  };

  userServiceMock={
    ...baseServiceMock,
    findByEmail: jest.fn(),
    findByEmailWithPassword: jest.fn(),
    findByUserName: jest.fn(),
    findUserByQuery: jest.fn(),
    getActiveUser:jest.fn(),
    findProfileByActiveUser:jest.fn(),
    updateActiveUserProfile:jest.fn(),
    updateAccountInfo:jest.fn(),
  }

    //creamos una base de metodos para mock ShopRepository
    const baseShopRepositoryMock={
      create:jest.fn(),//este todavia no se hizo
      getAllShops:jest.fn(),
      getShopByName:jest.fn(),
      getShopsByActiveUser:jest.fn(),
      findShopByQuery:jest.fn(),
    }
    
    ShopServiceMock={
      ...baseShopRepositoryMock,
      find:jest.fn(),
      findOne:jest.fn(),
      findOneBy:jest.fn(),
      save:jest.fn(),
      //fijate si hay mas que agregar a medidada que se vayan creando
    };

    const baseProfileServiceMock={
      create:jest.fn(),
      save:jest.fn(),
      findAll:jest.fn(),
      findOne:jest.fn(),
    }

    ProfileServiceMock={
      ...baseProfileServiceMock,
      create:jest.fn(),
      findProfileByUser:jest.fn(),
      updateActiveUserProfile:jest.fn(),
    }
    const baseFoodServiceMock={
      create:jest.fn(),
      save:jest.fn(),
      find:jest.fn(),
      findOne:jest.fn(),
    };

    FoodServiceMock={
      ...baseFoodServiceMock,
      createNewFood:jest.fn(),
      FindFoodByQuery:jest.fn(),
      findFoodByShopAndCategory:jest.fn(),
      findFoodById:jest.fn(),
      findAllFoods:jest.fn(),
      findFoodByCategoryId:jest.fn(),
      findFoodsByShopyId:jest.fn(),
    };

    const baseCartServiceMock={
      create:jest.fn(),
      save:jest.fn(),
      findOne:jest.fn(),
      delete:jest.fn(),
    }; 

    cartServiceMock={
      ...baseCartServiceMock,
      create:jest.fn(),
      getActiveCart:jest.fn(),
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
          provide:CartService,
          useValue:cartServiceMock
        },
        {
          provide:UserService,
          useValue:userServiceMock
        },
        {
          provide:FoodService,
          useValue:FoodServiceMock 
        },
        {
          provide:ProfileService,
          useValue:ProfileServiceMock 
        },
        {
          provide:ShopService,
          useValue:ShopServiceMock 
        },
        {
          provide:CategoryService,
          useValue:CategoryServiceMock 
        }
      ],
    }).compile();

    service = module.get<FoodOnCartService>(FoodOnCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); 
  
  describe('addFoodOnCart', () => {
    it('should add food on cart', async () => {
      //mock de parametros de metodo a probar
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };

      const foodOnCartDto: CreateFoodOnCartDto = {
        food: 1,
        amount: 2,
      };

    //mock de retornos de los emtodos que interactuan
      //mock del usuario
      const mockUser = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        createdAt: new Date(),
        shop: [],
        cart: new Cart(),
        profile: new Profile(),
      };

      //mock del carro activo
      const cart:Cart={
        cartId:1,
        user:mockUser,
        food:[],//carro vacio
        invoice:[],
        };
      
     
        //mock de la comida
      const mockFood = {
        foodId: 1,
        description: 'Test food',
        price: 10,
        stock: 5,
        review: 'Delicious',
        category: new Category(),
        shop: { shopId: 3, name: 'la tabla' } as Shop,
        image: null,
        cart: [],
      };
      //mock de la comida que esta en el carro (resultado)
      const foodOnCart:FoodOnCart={
        foodOnCartId:1,
        amount:3,
        cart:cart,
        food:mockFood
      } ;
       
      //configuracion del test
      //cuando se llama al metodo getActiveUser del servicio User esperamos que devuelba un usuario(activo)
      jest.spyOn(userServiceMock,'getActiveUser').mockResolvedValue(mockUser);
      //cuando se llama al metodo del servicio Food esperamos que resuleva trayendo una comida buscada por ID
      jest.spyOn(FoodServiceMock,'findFoodById').mockResolvedValue(mockFood);
      //cuando se llama al metodo del servicio Cart debe resolver el carrito qeu esta activo
      jest.spyOn(cartServiceMock,'getActiveCart').mockResolvedValue(cart);
      //cuando se llama al metodo del servicio debe retornar una comida para almacenar en el carro
      jest.spyOn(foodOnCartServiceMock,'create').mockReturnValue(foodOnCart)
      //cuando se llama al metodo del serivico debe resolver guardando la comida creada dentro del carro
      jest.spyOn(foodOnCartServiceMock,'save').mockResolvedValue(foodOnCart)
      
      //llamado al al metodo addFoodOnCart del servicio con los parametros correctos
      const result = await service.addFoodOnCart(activeUser, foodOnCartDto);

      ///verificamos que cada metodo haya sido llamado con los parametros indicados
      expect(userServiceMock.getActiveUser).toHaveBeenCalledWith(activeUser);
      expect(FoodServiceMock.findFoodById).toHaveBeenCalledWith(foodOnCartDto.food);
      expect(cartServiceMock.getActiveCart).toHaveBeenCalledWith(mockUser);
      expect(foodOnCartServiceMock.create).toHaveBeenCalledWith({
        ...foodOnCartDto,
        cart: cart,
        food: mockFood,
      });
      expect(foodOnCartServiceMock.save).toHaveBeenCalledWith(foodOnCart);
      //el resultado debe ser una comida agregada al carrito
      expect(result).toBe(foodOnCart);
    });

    it('should throw NotFoundException if user is not found', async ()=>{
      //mock de los parametros a pasar
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
  
      const foodOnCartDto: CreateFoodOnCartDto = {
        food: 1,
        amount: 2,
      };
      
      //configuracion del test: cuando se llame al metodo debe resolver con NULL para simular un error
      jest.spyOn(userServiceMock,'getActiveUser').mockResolvedValue(null);
      
      //llamado al metodo del servicio
      await expect(service.addFoodOnCart(activeUser,foodOnCartDto)).rejects.toThrow
      (new NotFoundException('Food_on_cart service: user not found - addFoodOnCart method'));
    });//final it

    it('should throw NotFoundException if food is not found', async () => {
      //mock de los parametros a utilizar
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
  
      const foodOnCartDto: CreateFoodOnCartDto = {
        food: 1,
        amount: 2,
      };
      
      const mockUser = new User();
      //configuracion del test:
      //llamado al metodo de UserService debe traer un usuario
      (userServiceMock.getActiveUser as jest.Mock).mockResolvedValue(mockUser);
      //llamado al metodo de foodService debe resolver con NULL para simular un error
      (FoodServiceMock.findFoodById as jest.Mock).mockResolvedValue(null);
  
      //verificamos que al llamar al servicio de Food_On_cart arroje una nueva NotFoundException
      await expect(service.addFoodOnCart(activeUser, foodOnCartDto)).rejects.toThrow(
        new NotFoundException('Food_on_cart service: food not found - addFoodOnCart method')
      );
    });

    it('should throw NotFoundException if cart is not found', async () => {
      //mock de los parametros a utilizar
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
  
      const foodOnCartDto: CreateFoodOnCartDto = {
        food: 1,
        amount: 2,
      };
  
      const mockUser = new User();
      const mockFood = new Food();
  
      //configuracion del test:
      //llamado al servicio User debe resolver con un usuario
      (userServiceMock.getActiveUser as jest.Mock).mockResolvedValue(mockUser);
      //llamado al servicio Food debe resolver con una comida
      (FoodServiceMock.findFoodById as jest.Mock).mockResolvedValue(mockFood);
      //llamado al servicio Cart debe resolver con NULL para simular un error
      (cartServiceMock.getActiveCart as jest.Mock).mockResolvedValue(null);
  
      //llamado al servcio foodOnCart con parametros correctos esperamos que arroje 
      //notFoundException
      await expect(service.addFoodOnCart(activeUser, foodOnCartDto)).rejects.toThrow(
        new NotFoundException('Food_on_cart service: cart not found - addFoodOnCart method')
      );
    });

    it('should throw BadGatewayException on unexpected error', async () => {
      //mock de los parametros a utilizar
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
  
      const foodOnCartDto: CreateFoodOnCartDto = {
        food: 1,
        amount: 2,
      };
      //configuracion del test
      //simulamos un error Inesperado al mmomento de buscar un usuario activo
      (userServiceMock.getActiveUser as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

      //llamado al metodo del servicio con los parametros correctos, debe arrojar una new badgatewayException
      await expect(service.addFoodOnCart(activeUser, foodOnCartDto)).rejects.toThrow(
        new BadGatewayException('FoodOnCartService: error adding food on cart - addFoodOnCart method')
      );
    });
  });//final describe 

  describe('getAllFoodOnCart',()=>{
    it('should return all food',async()=>{
      //mock de comidas dentro de un carro
      const mockFoodOnCart: FoodOnCart[] = [
        {
          foodOnCartId: 1,//Id de la comida en el carrito 
          amount: 2,//cantidad de comidas en el carrito
          cart: { //carrito perteneciente a un usuario activo
            cartId: 1,
            user: {//usuario propietario del carrito
              userId: 1,
              email: 'test@example.com',
              name: 'Test User',
              password: 'password123',
              createdAt: new Date(),
              shop: [],//no tiene tienda es comprador
              cart: null,
              profile: null,
            },
            food: [],//comidas en el carrito
            invoice: [],//facturas asociadas al carrito
          } as Cart,
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
          } as Food,
        },
        {
          foodOnCartId: 2,//Id de la siguiente comida en el carrito 
          amount: 5,//cantidad de comidas en el carrito
          cart: { //carrito perteneciente a un usuario activo
            cartId: 1,
            user: {//usuario propietario del carrito
              userId: 1,
              email: 'test@example.com',
              name: 'Test User',
              password: 'password123',
              createdAt: new Date(),
              shop: [],//no tiene tienda es comprador
              cart: null,//es NULL porque no necesitamos la relacion inversa para la prueba
              profile: null,
            },
            food: [],//es vacio porque estamos enfocando en la relacion desde FoodOnCart
            invoice: [],//facturas asociadas al carrito
          } as Cart,
          food: { //comida dentro del carrito
            foodId: 1,
            description: 'Test food',
            price: 10,
            stock: 5,
            review: 'Delicious',
            category: null,
            shop: null,
            image: null,
            cart: [],//es vacio porque estamos enfocando en la relacion desde FoodOnCart
          } as Food,
        },
      ];

    //configuracion del test
    //debe resolver trayendo todas las comidas del listado
    jest.spyOn(foodOnCartServiceMock,'find').mockResolvedValue(mockFoodOnCart)

    //llamado al servicio 
    const result = await service.getAllFoodOnCart();
    
    //verificamos
    expect(foodOnCartServiceMock.find).toHaveBeenCalledWith({
      relations:['cart','food'],
    });
    expect(result).toBe(mockFoodOnCart); 
    });//final it
  });//final desribe
  
});//final
   