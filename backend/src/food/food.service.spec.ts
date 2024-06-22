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
import { BadGatewayException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('FoodService', () => {
  let service: FoodService;
  //creo instancias mockeadas de los distintos servicios a usar
  let foodServiceMock: any;
  let categoryServiceMock:any;
  let shopServiceMock:any;

  beforeEach(async () => {
    //base de metohod para el mock FOODSERVICE
    const basefoodRepositoryMock={
      find:jest.fn(),
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
  });
  