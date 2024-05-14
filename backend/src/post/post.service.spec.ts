import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
//importaciones necesarias
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
//entities
import { Shop } from 'src/shop/entities/shop.entity';
//servicios/provedores
import { ShopService } from 'src/shop/shop.service';
//importo interface ActiveUser
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { UserService } from 'src/user/user.service';

describe('PostService', () => {
  let service: PostService;
  let postRepositoryMock:any;//definimos any para evistar problemas
  let shopServiceMock:Partial<jest.Mocked<ShopService>>;
  let userServiceMock:Partial<jest.Mocked<UserService>>;

  beforeEach(async () => {
    //creamos mocks para PostRepository, shopService
    const basePostRepositoryMock={
      newPost:jest.fn(),
      getAllPosts:jest.fn(),
      recommendPost:jest.fn(),
      unrecommendPost:jest.fn(),
      findOne:jest.fn(),
      update:jest.fn(),
      remove:jest.fn(),
    }
    // Mock como debe quedar generado el nuevo Post
    const newPost:Post={
      postId:1,
      description:'new mockDescription',
      stars:3,
      image:'new imagen',
      postedAt: new Date,
      shop: new Shop
    };
    //creamos una extencion del objeto basePostRepositoryMock para
    //agregar metodos que son propios de nest y para agregarlos y utilizarlos
    //en PostRepositoryMock
    postRepositoryMock={
      ...basePostRepositoryMock,
    //agregar metodos que se van necesitando
    };

    //creamos el mock con los metodos de ShopService
    shopServiceMock={
      create:jest.fn(),
      getAllShops:jest.fn(),
      getShopByName:jest.fn(),
      getShopsByActiveUser:jest.fn(),
      findShopByQuery:jest.fn(),
      //puedo ir agregando mas en base se vayan creando
    }
    //creamos el mock con los metodos de userService
    userServiceMock={
      create: jest.fn(),//mock para el metodo Create 
      findByEmail: jest.fn(),
      findByEmailWithPassword: jest.fn(),
      findByUserName: jest.fn(),
      findUserByQuery: jest.fn(),
      // Defino todos los métodos que necesito en el mock de user.service
    }

    //configuro el modulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService,
        {
          provide:getRepositoryToken(Post),//utilizamos GetRepositoryToken para obtener el token del repositorio de User
          useValue:postRepositoryMock,//proporcionamos nuestro mock para PostRepository
        },
        {
          provide:ShopService,
          useValue:shopServiceMock
        },
        {
          provide:UserService,
          useValue:userServiceMock
        }
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


//=========================================================
//FALTA TESTEAR
//=========================================================