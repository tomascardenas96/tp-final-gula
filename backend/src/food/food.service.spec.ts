import { Test, TestingModule } from '@nestjs/testing';
import { FoodService } from './food.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Category } from 'src/category/entities/category.entity';
import { ShopService } from 'src/shop/shop.service';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from 'src/user/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { ILike, MoreThan } from 'typeorm';
import { BadGatewayException, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import exp from 'constants';

describe('FoodService', () => {
  let service: FoodService;
  //creo instancias mockeadas de los distintos servicios a usar
  let foodServiceMock: any;
  let categoryServiceMock:any;
  let shopServiceMock:any;

  beforeEach(async () => {
    //base de metohod para el mock FOODSERVICE
    const basefoodRepositoryMock={
      create:jest.fn(),
      save:jest.fn(),
      find:jest.fn(),
      findOne:jest.fn(),
    };
    //FoodServiceMock
    foodServiceMock={
      ...basefoodRepositoryMock,
      findFoodByQuery:jest.fn(),
      findFoodByShopAndCategory:jest.fn(),
    };
    const baseShopServiceMock={
      create:jest.fn(),
      save:jest.fn(),
      find:jest.fn(),
      findOneBy:jest.fn(),
      findOne:jest.fn(),
    };
    shopServiceMock={
      ...baseShopServiceMock,
      createNewShop:jest.fn(),
      getAllShops:jest.fn(),
      getShopByName:jest.fn(),
      getShopByProfileName:jest.fn(),
      getShopsByActiveUser:jest.fn(),
      findShopByQuery:jest.fn(),
    };
    const baseCategoryServiceMock={
      find:jest.fn(),
      findOne:jest.fn(),
    };
    
    categoryServiceMock={
      ...baseCategoryServiceMock,
      findAllCategories:jest.fn(),
      findCategoryByName:jest.fn(),
    };

    //preguntar tomy si aca van las relaciones de la entidad? como hicimos en user.service.spec

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        ShopService,
        CategoryService,
        UserService,
        CartService,
        ProfileService, 
      {
        provide:getRepositoryToken(Food),
        useValue:foodServiceMock,
      },
      {
        provide:ShopService,
        useValue:shopServiceMock,
      },
      {
        provide:CategoryService,
        useValue:categoryServiceMock,
      },
      {
        provide:getRepositoryToken(User),
        useValue:UserService, 
      },
      {
        provide:getRepositoryToken(Cart),
        useValue:CartService, 
      },
      {
        provide:getRepositoryToken(Profile),
        useValue:ProfileService, 
      }
        //en caso de que vayan agregamos aca los provider y sue value de cada uno
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewFood',()=>{
    it('should create and return new food', async()=>{
      //mock de los parametros que se usaran para crear una nueva food
      const file: Express.Multer.File={filename:'test.jpg'} as any;
      
      const shopProfile= 'testShop';

      const newFood:CreateFoodDto={
        description:'test food',
        price:'10',
        stock:'5',
        review:'Delicious',
        category:'testCategory',
      };

      const activeUser:ActiveUserInterface={
        userId:1,
        email:'owner@test.com',
        name:'test User',
      };

      const shop:Shop={
        shopId: 1,
        name: 'Test Shop',//nombre del perfil de la tienda
        location: 'Location',
        phone: '1234567890',
        profilename: 'testShop',
        picture: 'shop.jpg',
        food: [],
        createdAt: new Date(),
        user: { email: 'owner@test.com' } as any,
        post: [],
        invoice: [],
      };

      const category: Category = {
        categoryId: 1,
        description: 'testCategory',
        food: [],
      };

      const food: Food = {
        foodId: 1,
        description: 'Test food',
        price: 10,
        stock: 5,
        review: 'Delicious',
        category: category,
        shop: shop,
        image: file.filename,
        cart: [],
      };

      //configuracion de la prueba esperamos que al ejecutar los emtodos resuelvan o retornen ciertos valores o entidades
      jest.spyOn(shopServiceMock,'getShopByProfileName').mockResolvedValue(shop);
      jest.spyOn(categoryServiceMock,'findCategoryByName').mockResolvedValue(category);
      jest.spyOn(foodServiceMock,'create').mockReturnValue(food);
      jest.spyOn(foodServiceMock,'save').mockResolvedValue(food);

      //llamado al servicio con los parametros mock
      const result= await service.createNewFood(file,shopProfile,newFood,activeUser);
      
      expect(result).toEqual(food);   
      expect(shopServiceMock.getShopByProfileName).toHaveBeenCalledWith(shopProfile);
      expect(categoryServiceMock.findCategoryByName).toHaveBeenCalledWith(newFood.category);
      expect(foodServiceMock.create).toHaveBeenCalledWith({
        ...newFood,
        shop,
        category,
        price:Number(newFood.price),
        stock:Number(newFood.stock),
        image:file.filename,
      });
      expect(foodServiceMock.save).toHaveBeenCalledWith(food);
    });//final it

    it('should throw NotFoundException if shop does not exist', async () => {
      const file: Express.Multer.File = { filename: 'test.jpg' } as any;
      const shopProfile = 'testShop';
      const newFood: CreateFoodDto = {
        description: 'Test food',
        price: '10',
        stock: '5',
        review: 'Delicious',
        category: 'testCategory',
      };
      const activeUser: ActiveUserInterface = { userId: 1, email: 'owner@test.com', name: 'Test User' };
      //configuracion del test:
      //cuando se llame a la tienda esta debe ser null 
      jest.spyOn(shopServiceMock, 'getShopByProfileName').mockResolvedValue(null);
      //esperamos que al no exitir la tienda arroje una exception
      await expect(service.createNewFood(file, shopProfile, newFood, activeUser))
        .rejects
        .toThrow(NotFoundException);
    }); 

    it('should throw NotFoundException if category does not exist', async () => {
     //mock de los parametros que se usaran para crear la food
      const file: Express.Multer.File = { filename: 'test.jpg' } as any;
      const shopProfile = 'testShop';
      const newFood: CreateFoodDto = {
        description: 'Test food',
        price: '10',
        stock: '5',
        review: 'Delicious',
        category: 'testCategory',
      };
      //mock del usuario activo
      const activeUser: ActiveUserInterface = { userId: 1, email: 'owner@test.com', name: 'Test User' };
      //mock de la tienda 
      const shop: Shop = {
        shopId: 1,
        name: 'Test Shop',
        location: 'Location',
        phone: '1234567890',
        profilename: 'testShop',
        picture: 'shop.jpg',
        food: [],
        createdAt: new Date(),
        user: { email: 'owner@test.com' } as any,
        post: [],
        invoice: [],
      };
      //configuracion de la tienda, debe resolver que la categoria no existe
      jest.spyOn(shopServiceMock, 'getShopByProfileName').mockResolvedValue(shop);
      jest.spyOn(categoryServiceMock, 'findCategoryByName').mockResolvedValue(null);
      //esperamos que lanze una exception cuando la cateogria no exista
      await expect(service.createNewFood(file, shopProfile, newFood, activeUser))
        .rejects
        .toThrow(NotFoundException);
    }); 

    it('should throw BadRequestException if active user is not shop owner', async () => {
      //mock de los parametros que se utilan para crear la food
      const file: Express.Multer.File = { filename: 'test.jpg' } as any;
      const shopProfile = 'testShop';
      const newFood: CreateFoodDto = {
        description: 'Test food',
        price: '10',
        stock: '5',
        review: 'Delicious',
        category: 'testCategory',
      };
      //el usuario activo sera distinto al propietario de la tienda
      const activeUser: ActiveUserInterface = { userId: 1,
        email: 'notowner@test.com',//este email no  coincide con el de la tienda(usuario actiivo no es propietario)
        name: 'Test User' };

      const shop: Shop = {
        shopId: 1,
        name: 'Test Shop',
        location: 'Location',
        phone: '1234567890',
        profilename: 'testShop',
        picture: 'shop.jpg',
        food: [],
        createdAt: new Date(),
        user: { email: 'owner@test.com' } as any,//propietario de la tienda distinto al activo
        post: [],
        invoice: [],
      };

      const category: Category = {
        categoryId: 1,
        description: 'testCategory',
        food: [],
      };
      //configuracion de la prueba tienda y cateogria existentes
      jest.spyOn(shopServiceMock, 'getShopByProfileName').mockResolvedValue(shop);
      jest.spyOn(categoryServiceMock, 'findCategoryByName').mockResolvedValue(category);

      //esperamos que como el usuario y propietario de la itenda son distitnto arroje una exception
      await expect(service.createNewFood(file, shopProfile, newFood, activeUser))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should throw BadGatewayException for other errors', async () => {
      //mock de los parametros a utilizar para crear una food
      const file: Express.Multer.File = { filename: 'test.jpg' } as any;
      const shopProfile = 'testShop';
      const newFood: CreateFoodDto = {
        description: 'Test food',
        price: '10',
        stock: '5',
        review: 'Delicious',
        category: 'testCategory',
      };
      const activeUser: ActiveUserInterface = { userId: 1, email: 'owner@test.com', name: 'Test User' };

      const shop: Shop = {
        shopId: 1,
        name: 'Test Shop',
        location: 'Location',
        phone: '1234567890',
        profilename: 'testShop',
        picture: 'shop.jpg',
        food: [],
        createdAt: new Date(),
        user: { email: 'owner@test.com' } as any,
        post: [],
        invoice: [],
      };

      const category: Category = {
        categoryId: 1,
        description: 'testCategory',
        food: [],
      };
      //configuracion del test
      jest.spyOn(shopServiceMock, 'getShopByProfileName').mockResolvedValue(shop);
      jest.spyOn(categoryServiceMock, 'findCategoryByName').mockResolvedValue(category);
      //configuramos test para que haya un error en la creacion de una food
      jest.spyOn(foodServiceMock, 'create').mockImplementation(() => { throw new Error('Unexpected Error') });
      //esperamos que al haber algun tipo de error inisperado arroje una badGatewayException
      await expect(service.createNewFood(file, shopProfile, newFood, activeUser))
        .rejects
        .toThrow(BadGatewayException);
    });
  });//final describe

  describe('findFoodByQuery', ()=>{
    it('should return an array of foods matching the query',async ()=>{

      //mock del food a buscar
      const query1= 'pizza';//should return object id:1,2 
      const query2= 'Delicious pizza';//should return object id:1
      const query3= 'hamburguesa';//should return array vacio
    //mock de lista de comidas
    const foods=[
      {
        foodId: 1,
        description: 'Delicious pizza',
        price: 10,
        stock: 5,
        image: 'pizza.jpg',
        review: 'Tasty!',
        shop: { shopId: 1, name: 'Pizza Shop' },
        category: { categoryId: 1, name: 'Italian' },
      },
      {
        foodId: 2,
        description: 'pizza rellena',
        price: 10,
        stock: 5,
        image: 'pizza.jpg',
        review: 'Tasty!',
        shop: { shopId: 2, name: 'Pizza Shop' },
        category: { categoryId: 1, name: 'Italian' },
      },
      {
        foodId: 3,
        description: 'other food',
        price: 10,
        stock: 5,
        image: 'pizza.jpg', 
        review: 'Tasty!',
        shop: { shopId: 2, name: 'Pizza Shop' },
        category: { categoryId: 1, name: 'Italian' },
      },  
    ];
    //configuracion del test
    // al usar el metodo find debe devolver un array de food
    foodServiceMock.find.mockReturnValue([foods[0],foods[1]]);
    //llamamos al metodo del servicio
    const result= await service.findFoodByQuery(query1);
    //console.log('esto es result',result)
    expect(foodServiceMock.find).toHaveBeenCalledWith({
      where:{
        description:ILike(`%${query1}%`), stock: MoreThan(0)},
        relations:['shop'],
      });
      expect(result).toEqual([foods[0], foods[1]]);
    });//final it 

    it('should throw a ForbiddenException if an error occurs', async () => {
      const query = 'burger';
      foodServiceMock.find.mockRejectedValue(new ForbiddenException);
  
      await expect(service.findFoodByQuery(query)).rejects.toThrow(ForbiddenException);
    });
    });//final describe 
    
    describe('findFoodByShopAndCategory',()=>{
      /*Antes de cada prueba, configuramos los mocks de los servicios 
      y el repositorio. Esto asegura que cada prueba tenga un entorno 
      limpio.*/
      it('should return an array of food if category and shop exist', async()=>{
        const profilename='pizzaShop';
        const category= 'Italian';
        const foundCategory={categoryId:1,name:'Italian'};
        const shop={shop:1,name:'pizza Shop',profilename:profilename};
        const foods=[
          {
            foodId: 1,
            description: 'Delicious pizza',
            price: 10,
            stock: 5,
            image: 'pizza.jpg',
            review: 'Tasty!',
            shop: shop,
            category: foundCategory,
          },
        ];
        //configuracion de la prueba
        //configuramos para:
        // Cuando se llame al metodo findCategoryByName de category.service resuelva con una categoria
        categoryServiceMock.findCategoryByName.mockResolvedValue(foundCategory);
        //cuando se llame a getShopByProfileName shop.service resuelva con una tienda
        shopServiceMock.getShopByProfileName.mockResolvedValue(shop);
        //cuando se llame al metodo find incluido en el metodo findFoodByShopAndCategory de foodService resuelva con una array de comidas
        foodServiceMock.find.mockResolvedValue(foods);//foods es un array de comidas

        //llamado al metodo del servico con parametros correctos
        const result= await service.findFoodByShopAndCategory(profilename,category);
        
        expect(categoryServiceMock.findCategoryByName).toHaveBeenCalledWith(category);
        expect(shopServiceMock.getShopByProfileName).toHaveBeenCalledWith(profilename);
        expect(foodServiceMock.find).toHaveBeenCalledWith({
          where:{ category:foundCategory,shop:shop},
        });
        expect(result).toEqual(foods);
      });//final it
      
      it('should throw NotFoundException if category does not exist', async () => {
        //mock de los parametros que se pasaran
        const profilename = 'PizzaShop';
        const category = 'NonExistentCategory';//categoria inexistente
        //configuracion de la prueba
        //resuelve null porque la categoria no exite
        categoryServiceMock.findCategoryByName.mockResolvedValue(null);
        
        //llamado al metodo del servicio y qeu arroje una exception
        await expect(service.findFoodByShopAndCategory(profilename, category)).rejects.toThrow(NotFoundException);
    
        //esperamos que sea llamado con los parametros correctos
        expect(categoryServiceMock.findCategoryByName).toHaveBeenCalledWith(category);
        expect(shopServiceMock.getShopByProfileName).not.toHaveBeenCalled();
        expect(foodServiceMock.find).not.toHaveBeenCalled();
      });
      
      it('should throw NotFoundException if shop does not exist', async () => {
        //mock de los parametros 
        const profilename = 'NonExistentShop';//tienda inexistente
        const category = 'Italian';
        //mock de la categoria encontrada
        const foundCategory = { categoryId: 1, name: 'Italian' };
        //configuracion de la prueba.
        //Debe resolver con null cuando no encuentra una tienda
        categoryServiceMock.findCategoryByName.mockResolvedValue(foundCategory);
        shopServiceMock.getShopByProfileName.mockResolvedValue(null);
        //llamamos al servicio con los parametros correctos y espramos que arroje una exception
        await expect(service.findFoodByShopAndCategory(profilename, category)).rejects.toThrow(NotFoundException);
        //verificamos que los metodos sean llamados con los aprametros correctos
        expect(categoryServiceMock.findCategoryByName).toHaveBeenCalledWith(category);
        expect(shopServiceMock.getShopByProfileName).toHaveBeenCalledWith(profilename);
        expect(foodServiceMock.find).not.toHaveBeenCalled();
      });

      it('should throw BadGatewayException on unexpected error', async () => {
        const profilename = 'PizzaShop';
        const category = 'Italian';
    
        categoryServiceMock.findCategoryByName.mockRejectedValue(new Error('Database error'));
    
        await expect(service.findFoodByShopAndCategory(profilename, category)).rejects.toThrow(BadGatewayException);
    
        expect(categoryServiceMock.findCategoryByName).toHaveBeenCalledWith(category);
        expect(shopServiceMock.getShopByProfileName).not.toHaveBeenCalled();
        expect(foodServiceMock.find).not.toHaveBeenCalled();
      });
    });//final describe

    describe('findFoodById',()=>{
      it('should retunr food by id',async ()=>{
        //mock de datos de prueba
        const foodId=1;
        const food:Food=
        {
          foodId: 1,
          description: 'Test food',
          price: 10,
          stock: 5,
          review: 'Delicious',
          category: { categoryId: 1, description: 'testCategory', food: [] },
          shop: {
            shopId: 1,
            name: 'Test Shop',
            location: 'Location',
            phone: '1234567890',
            profilename: 'testShop',
            picture: 'shop.jpg',
            food: [],
            createdAt: new Date(),
            user: { email: 'owner@test.com' } as any,
            post: [],
            invoice: [],
          },
          image: 'test.jpg',
          cart: [],
        };

        //configuracion del test. Debe resolver devolviendo una food.
        jest.spyOn(foodServiceMock,'findOne').mockResolvedValue(food);

        //llamamos al servicio con el parametro indicado
        const result= await service.findFoodById(foodId);

        expect(result).toEqual(food);
        expect(foodServiceMock.findOne).toHaveBeenCalledWith({where:{foodId}}); 
      });//final it 

      it('should throw BadGatewayException on error', async () => {
        const foodId = 1;
  
        jest.spyOn(foodServiceMock, 'findOne').mockRejectedValue(new BadGatewayException('Food service: error finding food by id - findFoodById method'));
          
        await expect(service.findFoodById(foodId)).rejects.toThrow(BadGatewayException);
      }); 
    })//final describe


    //Gaston's method
    describe('findAllFoods',()=>{
      it('should return all food with shop and category relations',async()=>{
        //mock de un array de comidas estas pertenecen a distintas tiendas y cateogrias 
        const foods: Food[] = [
          {
            foodId: 1,
            description: 'Food 1',
            price: 10,
            stock: 5,
            review: 'Good',
            image: 'food1.jpg',
            shop: { shopId: 1, name: 'Shop 1' } as any, //mock de una tienda
            category: { categoryId: 1, name: 'Category 1' } as any, //mock de una categoria
            cart: [],
          },
          {
            foodId: 2,
            description: 'Food 2',
            price: 15,
            stock: 3,
            review: 'Very good',
            image: 'food2.jpg',
            shop: { shopId: 2, name: 'Shop 2' } as any, // mockd e una tienda
            category: { categoryId: 2, name: 'Category 2' } as any, // mock de una cateogiria
            cart: [],
          },
        ];
        //se configura el test para que cuando se llame al metodo find se resuelva con un array de comidas
        jest.spyOn(foodServiceMock,'find').mockResolvedValue(foods);

        //llamdo al servicio
        const result= await service.findAllFoods();

        expect(result).toEqual(foods); 
        expect(foodServiceMock.find).toHaveBeenCalledWith({ relations:['shop','category']}); 
        /*Cuando hablamos de "solicitar las relaciones shop y category" en el contexto de TypeORM y NestJS, 
        nos referimos a cargar los objetos relacionados (shop y category) junto con el objeto principal (Food) 
        cuando se realiza una consulta a la base de datos. */
      });//final it

      it('should throw ForbiddenException on error', async () => {
        /*Mockeamos una implementacion del metodo find que arroja un error
        con el mensaje('Database connection error') para verificar que el servicio
        lanza una 'forbiddenException' con el mensaje correcto cuando ocurre un error*/
        
        jest.spyOn(foodServiceMock,'find').mockImplementation(() => {
          throw new Error('Database connection error');
        });
        //esperamos que cuando se llama al metodo del servicio se lanze la exception y el mensjae
        await expect(service.findAllFoods()).rejects.toThrow(ForbiddenException);
        await expect(service.findAllFoods()).rejects.toThrow('Food service: error getting all foods');
      });
    });//final describe

    describe('findFoodByCategoyId',()=>{
      it('should return food by categoryId', async ()=>{
        //mock del parametro que se paasara al metodo
        const categoryId=1;
        //mock del la entidad u obejto esperado
        const foods: Food[] = [
          {
            foodId: 1,
            description: 'Pizza',
            price: 10,
            stock: 5,
            image: 'pizza.jpg',
            review: 'Delicious!',
            shop: {
              shopId: 1,
              name: 'Pizza Shop',
              location: 'Test Location',
              phone: '123456789',
              profilename: 'pizzashop',
              picture: 'shop.jpg',
              createdAt: new Date(),
              user: { email: 'owner@test.com' } as any,
              post: [],
              food: [],
              invoice: [],
            },
            category: {
              categoryId: 1,
              description: 'Italian',
              food: [],
            },
            cart: [],
          },
        ];
        //configuracion de la prueba
        //se configura para que cuando se utileze el metodo find resuelva con un array de foods
        jest.spyOn(foodServiceMock,'find').mockResolvedValue(foods);

        //llamado al servicio con parametros correctos
        const result= await service.findFoodsByCategoryId(categoryId);

        expect(result).toEqual(foods);
        expect(foodServiceMock.find).toHaveBeenCalledWith({where:
          {category:{categoryId}},
        relations:['shop','category'],
      });
      });//final it

      it('should throw ForbiddenException on error', async () => {
        //mock del parametro con el qeu se llamara al metodo
        const categoryId = 1;
        //configuracion de la prueba, dere arrojar un error
        jest.spyOn(foodServiceMock, 'find').mockRejectedValue(new Error());
        //llamada al servicio
        //intentara que cuando se llame al metodo del servicio con el parametro correcto
        //arrojara un error segun cofiguracion del test
        try {
          await service.findFoodsByCategoryId(categoryId);
        } catch (error) {//captura el error
          //verifica que el error se una instancia de forbiddenException
          expect(error).toBeInstanceOf(ForbiddenException);
          //verifica que el mensaje del error sea...
          expect(error.message).toBe('Food service: error getting foods by categoryId');
        }
      });//final it
    });//final describe

  });//final
  