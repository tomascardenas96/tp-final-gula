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
import { GulaSocketGateway } from 'src/socket/socket.gateway';



describe('FoodOnCartService', () => {
  let service: FoodOnCartService;
  let foodOnCartServiceMock:any;
  let userServiceMock:any;
  let ShopServiceMock:any;
  let ProfileServiceMock:any;
  let FoodServiceMock:any;
  let CategoryServiceMock:any;
  let cartServiceMock:any;
  let socketGatewayMock:any;

  const baseFoodOnCartService={
    create:jest.fn(),
    save:jest.fn(),
    find:jest.fn(),
    findOne:jest.fn(),
    delete:jest.fn(),
  };

  foodOnCartServiceMock={
    ...baseFoodOnCartService,
    addFoodOnCart:jest.fn(),
    getFoodsByActiveCart:jest.fn(),
    clearCart:jest.fn(),
    addOrSubtractProduct:jest.fn(),
    getAllFoodOnCart:jest.fn(),
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
    };

    socketGatewayMock={
      handleAddFoodInCart:jest.fn(),
      handleAddFoodExistentInCart:jest.fn(),
    };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodOnCartService,
        CartService,
        UserService,
        FoodService,
        ProfileService,
        ShopService,
        CategoryService,
        GulaSocketGateway, 
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
   /* it('should add food on cart', async () => {
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
        amount:2,
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

      //cuando se llama al metodo FindOne resuelva con null para que agrege en este caso una comida al carrito y no que sume 1 a la que ya esta
      jest.spyOn(foodOnCartServiceMock,'findOne').mockResolvedValue(null);
      //cuando se llama al metodo del servicio debe retornar una comida para almacenar en el carro
      jest.spyOn(foodOnCartServiceMock,'create').mockReturnValue(foodOnCart)
      //cuando se llama al metodo del serivico debe resolver guardando la comida creada dentro del carro
      jest.spyOn(foodOnCartServiceMock,'save').mockResolvedValue(foodOnCart)
      
      // Mock de métodos del socket
      jest.spyOn(socketGatewayMock, 'handleAddFoodInCart').mockImplementation();
      jest.spyOn(socketGatewayMock, 'handleAddFoodExistentInCart').mockImplementation();
      
      //llamado al al metodo addFoodOnCart del servicio con los parametros correctos
      const result = await service.addFoodOnCart(activeUser, foodOnCartDto);

      ///verificamos que cada metodo haya sido llamado con los parametros indicados
      expect(userServiceMock.getActiveUser).toHaveBeenCalledWith(activeUser);
      expect(FoodServiceMock.findFoodById).toHaveBeenCalledWith(foodOnCartDto.food);
      expect(cartServiceMock.getActiveCart).toHaveBeenCalledWith(mockUser);
      expect(foodOnCartServiceMock.findOne).toHaveBeenCalledWith({where:{food:mockFood,cart:cart}});
      expect(foodOnCartServiceMock.create).toHaveBeenCalledWith({
        ...foodOnCartDto,
        cart: cart,
        food: mockFood,
      });
      expect(socketGatewayMock.handleAddFoodInCart).toHaveBeenCalledWith(foodOnCart);
      expect(socketGatewayMock.handleAddFoodExistentInCart).not.toHaveBeenCalled();
      //expect(foodOnCartServiceMock.save).toHaveBeenCalledWith(foodOnCart);
      //el resultado debe ser una comida agregada al carrito
      expect(result).toBe(foodOnCart);
    });*/

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

  describe('getFoodsByActiveCart', () => {
    it('should return list of foods in active cart', async () => {
      // Mock de datos de entrada
      const activeUser = { userId: 1, email: 'test@example.com', name: 'Test User' };

      // Mock de entidades necesarias
      const mockUser = new User();
      mockUser.userId = 1;
      mockUser.email = 'test@example.com';
      mockUser.name = 'Test User';

      const mockCart = new Cart();
      mockCart.cartId = 1;
      mockCart.user = mockUser;

      const mockFoodsOnCart: FoodOnCart[] = [
        { foodOnCartId: 1, amount: 2, cart: mockCart, food: null },
        { foodOnCartId: 2, amount: 1, cart: mockCart, food: null },
      ];

      // Mock de métodos de los servicios
      jest.spyOn(userServiceMock, 'getActiveUser').mockResolvedValue(mockUser);
      jest.spyOn(cartServiceMock, 'getActiveCart').mockResolvedValue(mockCart);
      jest.spyOn(foodOnCartServiceMock, 'find').mockResolvedValue(mockFoodsOnCart);

      // Ejecución del método bajo prueba
      const result = await service.getFoodsByActiveCart(activeUser);

      // Verificaciones
      expect(userServiceMock.getActiveUser).toHaveBeenCalledWith(activeUser);
      expect(cartServiceMock.getActiveCart).toHaveBeenCalledWith(mockUser);
      expect(foodOnCartServiceMock.find).toHaveBeenCalledWith({
        where: { cart: mockCart },
        relations: ['food'],
      });
      expect(result).toEqual(mockFoodsOnCart);
    });

    it('should throw BadGatewayException if any error occurs', async () => {
      // Mock de datos de entrada
      const activeUser = { userId: 1, email: 'test@example.com', name: 'Test User' };

      //configuracion del test
      // Mock para userService.getActiveUser que retorna un usuario válido
      jest.spyOn(userServiceMock, 'getActiveUser').mockResolvedValue(new User());
      
      // Mock para cartService.getActiveCart que lanza una excepción
      jest.spyOn(cartServiceMock, 'getActiveCart').mockRejectedValue(new Error('Database connection failed'));

      //llamado al metodo del servicio, verificación de excepción
      await expect(service.getFoodsByActiveCart(activeUser)).rejects.toThrow(BadGatewayException);
      expect(userServiceMock.getActiveUser).toHaveBeenCalledWith(activeUser);
      expect(cartServiceMock.getActiveCart).toHaveBeenCalledWith(expect.any(User));

      /*expect.any(User) asegura que el argumento pasado a getActiveCart sea una instancia
       de la clase User, sin importar los detalles específicos del objeto en sí, solo que 
       sea del tipo correcto. */
    });//final it
  });//final describe

  describe('clearCart',()=>{
    it('should clear the active cart for a user', async ()=>{
      // Datos de usuario activo simulado
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
      //Mock de usuario y carrito activo
      const mockUser = { userId: 1 };
      const mockCart = { cartId: 1, user: mockUser };
      
      //configuracion del test
      //cuando se llame al metodo delete se debe resolver con un objeto vacio
      userServiceMock.getActiveUser.mockResolvedValue(mockUser);
      cartServiceMock.getActiveCart.mockResolvedValue(mockCart);
      foodOnCartServiceMock.delete.mockResolvedValue({affected:2})//mock respuesta de eliminacion
      
      //llamado al servicio con parametro correcto
      const result= await service.clearCart(activeUser);

      // Verificación de llamadas a métodos y resultados
      expect(userServiceMock.getActiveUser).toHaveBeenCalledWith(activeUser);
      expect(cartServiceMock.getActiveCart).toHaveBeenCalledWith(mockUser);
      expect(foodOnCartServiceMock.delete).toHaveBeenCalledWith({ cart: mockCart });
      expect(result).toEqual({ affected: 2 }); // Verifica el resultado esperado de la eliminación
    });

    it('should throw BadGatewayException if an error occurs', async () => {
      // Datos de usuario activo simulado
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      }; 
      //mock de un error
      const mockError= new Error ('Test error');
      //configuracion de la prueba
      //getActiveUser debe devolver un usuario activo
      userServiceMock.getActiveUser.mockResolvedValue(activeUser);
      //se configura getActiveCart y delete para que lanzen un error cuando sean llamados
      cartServiceMock.getActiveCart.mockRejectedValue(mockError);
      foodOnCartServiceMock.delete.mockRejectedValue(mockError);

      // Llamada al método DEL SERVICIO y verificación que lance una excepción
      await expect(service.clearCart(activeUser)).rejects.toThrow(BadGatewayException);
      //verifica que getActiveUser no sea haya llamado cuando se lanza una exception 
      expect(userServiceMock.getActiveUser).toHaveBeenCalledWith(activeUser);
      expect(cartServiceMock.getActiveCart).toHaveBeenCalled();
      expect(foodOnCartServiceMock.delete).toHaveBeenCalled(); 
    }); 
  });
/*  describe('addOrSubtractProduct',()=>{
    it('should add 1 quantity to food on cart', async () => {
      //mock de parametros autilizar
      const activeUser:ActiveUserInterface = {
         userId: 1,
         email: 'test@example.com', 
         name: 'Test User' };
      
      const mockUser= new User();
      mockUser.userId=1,
      mockUser.email=activeUser.email,
      mockUser.name=activeUser.name;

      const mockFood = new Food();
      mockFood.foodId = 1;

      const mockCart = new Cart();
      mockCart.cartId = 1;

      const food_on_cart:FoodOnCart={
        foodOnCartId:1,
        amount:2,
        cart:mockCart,
        food:mockFood
      };
  
      jest.spyOn(userServiceMock, 'getActiveUser').mockResolvedValue(mockUser);
      jest.spyOn(cartServiceMock, 'getActiveCart').mockResolvedValue(mockCart);
      jest.spyOn(foodOnCartServiceMock, 'findOne').mockResolvedValue(food_on_cart//{
        //food: mockFood,
        //cart: mockCart,
        //amount: 2, // mock de la cantidad de comida exitente en el carrito
     // }
    );
  
      const result = await service.addOrSubtractProduct('add', mockFood, mockUser);
  
      expect(result.amount).toBe(3); // asumiendo que antes la cantidad de comida fue 2, ahora sumamos 1
      expect(foodOnCartServiceMock.save).toHaveBeenCalled();
      expect(socketGatewayMock.handleAddOrSubtractFood).toHaveBeenCalledWith(result);
    }); 

    it('should subtract 1 quantity from food on cart', async () => {
      const mockUser = { userId: 1, email: 'test@example.com', name: 'Test User' };
      const mockFood = new Food();
      mockFood.foodId = 1;
      const mockCart = new Cart();
      mockCart.cartId = 1;
  
      jest.spyOn(userServiceMock, 'getActiveUser').mockResolvedValue(mockUser);
      jest.spyOn(cartServiceMock, 'getActiveCart').mockResolvedValue(mockCart);
      jest.spyOn(foodOnCartServiceMock, 'findOne').mockResolvedValueOnce({
        food: mockFood,
        cart: mockCart,
        amount: 2, // mock de cantidad de comida dentro de un carro
      });
  
      const result = await service.addOrSubtractProduct('subtract', mockFood, mockUser);
  
      expect(result.amount).toBe(1); // asumimos que tenia 2 comidas dentro del carro, ahora debe restar 1
      expect(foodOnCartServiceMock.save).toHaveBeenCalled();
      expect(socketGatewayMock.handleAddOrSubtractFood).toHaveBeenCalledWith(result);
    });

    it('should throw BadGatewayException when an error occurs', async () => {
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
     
      const mockUser = new User();
      mockUser.userId=1;
      mockUser.email=activeUser.email;
      mockUser.name= activeUser.name;
      
      const mockFood = new Food();
      mockFood.foodId = 1;

      const mockCart = new Cart();
      mockCart.cartId = 1;
  
      jest.spyOn(userServiceMock, 'getActiveUser').mockResolvedValue(mockUser);
      jest.spyOn(cartServiceMock, 'getActiveCart').mockRejectedValue(mockCart);
      jest.spyOn(foodOnCartServiceMock, 'findOne').mockResolvedValueOnce({
        food: mockFood,
        cart: mockCart,
        amount: 2, //cantidad de comidas en el carro
      });

      // Configuración para simular un error al guardar
      jest.spyOn(foodOnCartServiceMock, 'save').mockRejectedValueOnce(new Error('Mock save error'));

      //esperamos que se lance una BadGatewayException
      await expect(service.addOrSubtractProduct('add', mockFood, mockUser)).rejects.toThrow(BadGatewayException);

      //verificamos que finOne se haya llamado una sola vez
      expect(foodOnCartServiceMock.findOne).toHaveBeenCalledTimes(1); 
      //verificamos que save no se haya llamado
      expect(foodOnCartServiceMock.save).not.toHaveBeenCalled();
      //verificamos que sockegateway No se haya llamado  
      expect(socketGatewayMock.handleAddOrSubtractFood).not.toHaveBeenCalled();
    });
  });//final describe*/

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
   