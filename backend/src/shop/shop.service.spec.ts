import { Test, TestingModule } from '@nestjs/testing';
//importaciones necesarias
import { getRepositoryToken } from '@nestjs/typeorm';
//entities
import { Shop } from './entities/shop.entity';
//servicios/provedores
import { ShopService } from './shop.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Food } from 'src/food/entities/food.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { PostService } from 'src/post/post.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { BadGatewayException } from '@nestjs/common';


describe('ShopService', () => {
  let service: ShopService;
  let shopRepositoryMock:any;//definimos any para evitar problemas
  let userServiceMock:Partial<jest.Mocked<UserService>>;
  let postServiceMock:Partial<jest.Mocked<PostService>>;
  let ProfileServiceMock:Partial<jest.Mocked<ProfileService>>;
  let CartServiceMock:Partial<jest.Mocked<CartService>>;

  beforeEach(async () => {
    //creamos una base de metodos para mock Shop
    const baseShopRepositoryMock={
      create:jest.fn(),//este todavia no se hizo
      getAllShops:jest.fn(),
      getShopByName:jest.fn(),
      getShopsByActiveUser:jest.fn(),
      findShopByQuery:jest.fn(),
    }
    
    shopRepositoryMock={
      ...baseShopRepositoryMock,
      find:jest.fn(),
      findOneBy:jest.fn(),
      //fijate si hay mas que agregar a medidada que se vayan creando
    };
    //mock de como queda un obejto shop creado
   /* const newShop:Shop={
      shopId:1,
      name:'Shop name',
      location:'location test',
      phone:'phone number',
      profilename:'unique name',
      picture:'photo link',
      createdAt:new Date,
      user: new User,
      post:Post[],    //revisar
      food:Food[],    //revisar
      invoice:Invoice[]    //revisar
    };*/ 

    //creamos el mock para los metodos de UserService
    userServiceMock={
      create: jest.fn(),//mock para el metodo Create 
      findByEmail: jest.fn(),
      findByEmailWithPassword: jest.fn(),
      findByUserName: jest.fn(),
      findUserByQuery: jest.fn(),
      // Defino todos los métodos que necesito en el mock de user.service
    };
    postServiceMock={
      newPost:jest.fn(),
      getAllPosts:jest.fn(),
      recommendPost:jest.fn(),
      unrecommendPost:jest.fn(),
      findOne:jest.fn(),
      update:jest.fn(),
      remove:jest.fn(),
    };
    ProfileServiceMock={
      create:jest.fn(),
      //AGREGAR METODOS DE PROFILE SERVICE CUANDO SE CREEN 
    }
    CartServiceMock={
      create:jest.fn(),
      //AGREGAR METODOS DE PROFILE SERVICE CUANDO SE CREEN
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        PostService,
        UserService, 
        ProfileService,
        CartService,
      {
        provide:getRepositoryToken(Shop),
        useValue:shopRepositoryMock,
      },
      {
        provide:getRepositoryToken(User),
        useValue:userServiceMock,
      },
      {
        provide:getRepositoryToken(Post),
        useValue:postServiceMock,
      },
      {
        provide:getRepositoryToken(Profile),
        useValue:ProfileServiceMock 
      },
      {
        provide:getRepositoryToken(Cart),
        useValue:CartServiceMock,
      }
      //en caso de que vayan agregamos aca los provider y sue value de cada uno
    ],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create',()=>{
  /*  it('should add or create a new shop',async ()=>{
      const newShop:Shop={
        shopId:1,
      name:'Shop name',
      location:'location test',
      phone:'phone number',
      profilename:'unique name',
      picture:'photo link',
      createdAt:new Date(),
      user: new User,
      post:[], 
      food:[], 
      invoice: []
      };
      //configurar el mopck del repositorio para simular la creacion de una tienda
      shopRepositoryMock.create.mockResolvedValueOnce(newShop);

      //llamamos al metodo Create
      const result = await service.create(//aca va el obejto tipo createDto);
      //expect(result).
     });*/   //final it
  });//final describe CREATE

describe('getAllShops',()=>{
  it('should return an array the shops',async ()=>{
    //simulamos un array de shops
    const shops=[{name:'shop-1'},{name:'shop-2'}];

    //configuramos el mock para que devuelba un array de shops
    shopRepositoryMock.find.mockResolvedValue(shops);

    //llamamos al metodo getAllShops
    const result= await service.getAllShops();
    
    //esperamos que
    expect(result).toEqual(shops);
    expect(shopRepositoryMock.find).toHaveBeenCalled()
  });
  it('should throw a badGatewayException if an error occurs',async ()=>{
    const errorMessage= 'database error';
    //configuro el mock para que se arroje el error como respuesta
    shopRepositoryMock.find.mockRejectedValue(new BadGatewayException({errorMessage}));

    //llamo al metodo getAllShops
    await expect(service.getAllShops()).rejects.toThrowError(BadGatewayException);
    expect(shopRepositoryMock.find).toHaveBeenCalled(); 
  });//final IT
})


});//final
  