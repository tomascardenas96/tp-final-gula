import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
//agrego importaciones
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { ProfileService } from '../profile/profile.service';
import { PostService } from '../post/post.service';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/entities/cart.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Post } from '../post/entities/post.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateShopDto } from './dto/create-shop.dto';
import { ActiveUserInterface } from '../common/interface/active-user.interface';



describe('ShopController', () => {
  let controller: ShopController;
  let service: ShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopController],
      providers: [
        ShopService,
        UserService,
        ProfileService,
        PostService,
        CartService,
        JwtService, 
        {
          provide:getRepositoryToken(Shop),//obtenemos el token del repositorio del user
          useClass:Repository //simula un repositorio, se podria usar un mock
        },
        {
          provide:getRepositoryToken(User),//obtenemos el token del repositorio del user
          useClass:Repository,//simula un repositorio, se podria usar un mock
        },
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository,
        },
        {
          provide:getRepositoryToken(Profile),
          useClass:Repository,
        },
        {
          provide:getRepositoryToken(Post),
          useClass:Repository,
        }
      ],
    }).compile();

    controller = module.get<ShopController>(ShopController);
    service=module.get<ShopService>(ShopService); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
//////no funciona porque no esta echo el metodo aun
  describe('create',()=>{
    it('should call shop.service.create with the correct parameters', async ()=>{
      //mock de una tienda
      //mock de una interface de usuario activo
      const activeUser:ActiveUserInterface={
        userId:1,
        email:'test@example.com',
        name:'test user'
      };
      //mock del ususario "activo"
      const user:User={
        userId: 1,
        name:activeUser.name,
        email: activeUser.email,
        password: 'password',
        createdAt: new Date(),
        profile: new Profile,
        cart: new Cart,
        shop: [],
      }
      const baseShops:any = {//typo any poruqe el ID se agrega luego
          name: 'Test Shop',
          location: 'Location1',
          phone: '123456789',
          profilename: 'ProfileName1',
          picture: 'PictureLink1',
          createdAt: new Date(),
          user: user,
          post: [],
          food: [],
          invoice: [],
        };
         //datos necesarios para la creacion de una tienda
      const createShopDto: CreateShopDto={
        name:'test shop',
        location:'test location',
        phone:'123456',
        profilename:'test profileName',
      }
       // Mock del archivo que se va a subir
       const file: Express.Multer.File = {
        fieldname: 'picture',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        buffer: Buffer.from(''),
        stream: null,
        destination: '',
        filename: 'test.jpg',
        path: '',
      };
  

        //luego de usar el metodo create el resultado debe ser una tienda del tipo SHOP
        const result={shopId:1,...baseShops};//agrego el id a los datos de una tienda
        //llamo al metodo del servicio
        jest.spyOn(service,'createNewShop').mockImplementation(async()=>result)
        //espero que el controlador llame al metodo create con los parametros correctos
        expect(await controller.createNewShop(file,createShopDto,activeUser)).toBe(result);
        //espero qeu el metodo create del servicio sea llamado con parametros correctos
        expect(service.createNewShop).toHaveBeenCalledWith(file,createShopDto,activeUser);
    });
  });//discribe */

  describe('getAllShops', () => {
    it('should call shopService.getAllShops and return the result', async () => {
      //mock del objeto shop
      const result:Shop[] = [{
        shopId:1,
        name: 'Test Shop',
        location: 'Location1',
        phone: '123456789',
        profilename: 'ProfileName1',
        picture: 'PictureLink1',
        createdAt: new Date(),
        user: new User,
        post: [],
        food: [], 
        invoice: []}];
      //llamamos al metodo del servicio
      jest.spyOn(service, 'getAllShops').mockImplementation(async () => result);

      expect(await controller.getAllShops()).toBe(result);
      expect(service.getAllShops).toHaveBeenCalled();
    });//final it
  });//discribe

  describe('getshopsByActiveUser',()=>{
    it('should call shopService .getshopsByActiveUser with the correct parameters',async ()=>{
      //mock de una interface de user
      const user:ActiveUserInterface={
        userId:1,
        email:'test@example.com',
        name: 'TesUser',        
      };
      //mock de un array de tiendas
      const result:Shop[] = [
        {
          shopId:1,
          name: 'Test Shop',
          location: 'Location1',
          phone: '123456789',
          profilename: 'ProfileName1',
          picture: 'PictureLink1',
          createdAt: new Date(),
          user: {} as User,
          post: [],
          food: [], 
          invoice: []}
       ];
       // llamado al metodo del servicio
       jest.spyOn(service, 'getShopsByActiveUser').mockImplementation(async()=> result);
       
       expect(await controller.getShopsByActiveUser(user)).toBe(result); 
       expect(service.getShopsByActiveUser).toHaveBeenCalledWith(user);
      });//final it
  })//final describe

  describe('findShopByQuery',()=>{
    it('should call shopService.findShopByQuery with the correct parameters',async ()=>{
      //genramos un mock con el nombre a buscar
      const shop= 'Test Shop';
      //lo que nos deberia devolver es la tienda que cumpla con la query
      //mock de array de tiendas
      const result:Shop[]=[ 
        {
          shopId: 1,
          name: 'Test Shop',
          location: 'Test Location',
          phone: '123456789',
          profilename: 'Test Profile',
          picture: 'test.jpg',
          createdAt: new Date(),
          user: new User,
          post: [],
          food: [],
          invoice: []
        },
        {
          shopId: 2,
          name: 'another shop',
          location: 'Test Location',
          phone: '123456789',
          profilename: 'Test Profile',
          picture: 'test.jpg',
          createdAt: new Date(),
          user: new User,
          post: [],
          food: [],
          invoice: []
        }
      ];

      //espiamos el metodo findShopByQuery del servicio
      jest.spyOn(service,'findShopByQuery').mockImplementation(async()=>result);
      
      expect(await controller.findShopByQuery(shop)).toBe(result);
      expect(service.findShopByQuery).toHaveBeenCalledWith(shop); 
      
    });//final it
  });//final describe                ////revisar
  
});//FINAL 
