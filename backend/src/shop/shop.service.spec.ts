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
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';



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
  //======================================================================
  //======================================================================
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
//======================================================================
//======================================================================
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
});//final describe
//======================================================================
//======================================================================
describe('getShopByName',()=>{
  it('should return a shop with the specified name from the array of the shops',async ()=>{
    //tienda a buscar
    const shopName='ShopName';
    
    //array de tiendas mock
    //shop mocked
     const shops: Shop[] = [
        {
          shopId: 1,
          name: 'ShopName',
          location: 'Location1',
          phone: '123456789',
          profilename: 'ProfileName1',
          picture: 'PictureLink1',
          createdAt: new Date(),
          user: new User(),
          post: [],
          food: [],
          invoice: [],
        },
        {
          shopId: 2,
          name: 'AnotherShop',
          location: 'Location2',
          phone: '987654321',
          profilename: 'ProfileName2',
          picture: 'PictureLink2',
          createdAt: new Date(),
          user: new User(),
          post: [],
          food: [],
          invoice: [],
        },
      ];
    //configuro el mock para que resuelva la promesa debolviendo el nombre o null
    shopRepositoryMock.findOneBy.mockImplementation(({ name }) => {
      return Promise.resolve(shops.find(shop => shop.name === name) || null);
    });

    //llamamos al metodo del servicio y pasamos parametro a bsucar
    const result = await service.getShopByName(shopName);

    expect(shopRepositoryMock.findOneBy).toHaveBeenCalledWith({name:shopName});//esperamos qeu el metodo sea llamado con el nombre de la tienda
    expect(result).toEqual(shops[0]);//esperamos que el objeto encontrado, sea en este caso, el del nombre'shopName' que es el sub-indice 0;
  });//final it

  it('should return null if no shop is found in the array of shops',async ()=>{
    const shopName= 'noExistNameShop';//nombre que no existira

    //array de tiendas mock
    //shop mocked
    const shops: Shop[] = [
      {
        shopId: 1,
        name: 'ShopName',
        location: 'Location1',
        phone: '123456789',
        profilename: 'ProfileName1',
        picture: 'PictureLink1',
        createdAt: new Date(),
        user: new User(),
        post: [],
        food: [],
        invoice: [],
      },
      {
        shopId: 2,
        name: 'AnotherShop',
        location: 'Location2',
        phone: '987654321',
        profilename: 'ProfileName2',
        picture: 'PictureLink2',
        createdAt: new Date(),
        user: new User(),
        post: [],
        food: [],
        invoice: [],
      },
    ];
    //configuramos el mock para que devuelba la promesa de la tienda o un valor nulo en caso de que no exista
    shopRepositoryMock.findOneBy.mockImplementation(({name})=>{
      return Promise.resolve(shops.find(shop=>shop.name===name)|| null);
    });

    //llamamos al servicio
    const result= await service.getShopByName(shopName);

    expect(shopRepositoryMock.findOneBy).toHaveBeenCalledWith({name:shopName});
    //esperramos que el metodo se llame con un  numbre inexistente
    expect(result).toBeNull();
  });
//agregar para exepciones cuando tomy finalice el metodo.
});//final describe

//======================================================================
//======================================================================
describe('getShopsByActiveUser',()=>{
  /*Escenarios de Prueba: Probaremos dos escenarios principales:
Caso exitoso donde el usuario es encontrado y se retornan las tiendas.
Caso donde ocurre un error y se lanza una excepción BadGatewayException.**/
  it('should return shops for the active user',async ()=>{
    
    //datos de usuario activo
    const user_Interface:ActiveUserInterface={
      userId:1,
      email:'test@example.com',
      name:'userName'};

    const emailvalidString=user_Interface.email
    
    //usuario activo
    const userActive:User={
      userId:1,
      email:'test@example.com',
      name:'userName',
      password:'password123',
      createdAt:new Date(),
      shop:[],
      cart:new Cart,
      profile:new Profile,
    }
    
    //array de tiendas
    const shops: Shop[] = [
      {
        shopId: 1,
        name: 'Test Shop',//nombre de la tienda
        location: 'Location1',
        phone: '123456789',
        profilename: 'ProfileName1',
        picture: 'PictureLink1',
        createdAt: new Date(),
        user: userActive,//indica que el usuario esta activo
        post: [],
        food: [],
        invoice: [],
      },
      {
        shopId: 2,
        name: 'AnotherShop',
        location: 'Location2',
        phone: '987654321',
        profilename: 'ProfileName2',
        picture: 'PictureLink2',
        createdAt: new Date(),
        user: null,//no esta activo
        post: [],
        food: [],
        invoice: [],
      },
    ];
    //Mockeamos findByEmail para que devuelva un activeUser
    userServiceMock.findByEmail.mockResolvedValue(userActive);//devolvera un usuario activo
    shopRepositoryMock.find.mockResolvedValue([shops[0]]);//debe devolver solo las tiendas del ussuario activo

    //llamamos al metodod del servicio
    const result= await service.getShopsByActiveUser(user_Interface);
   
    //recibe como parametro los datos de la interface del ussuario activo.
    //console.log('esto es lo que recibo en result',result);
    expect(userServiceMock.findByEmail).toHaveBeenCalledWith(user_Interface.email);
   // expect(shopRepositoryMock.find).toHaveBeenCalledWith({where: {user:userActive} });
    //verifica q solo se incluyan las tiendas que tiene usuario activo
    //expect(result).toEqual([shops[0]]);  
    
  }); 
   
});//final describe

 
 
});//final
  