import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
//importaciones necesarias
import { getRepositoryToken } from '@nestjs/typeorm';
//entities
import { Post } from './entities/post.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from 'src/user/entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Cart } from 'src/cart/entities/cart.entity';
//servicios/provedores
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';
//importo interface ActiveUser
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CreatePostDto } from './dto/create-post.dto';
//excepciones
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
      find:jest.fn(),
      create:jest.fn(),
      save:jest.fn(),
      trim:jest.fn()
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

  describe('newPost',()=>{
    //configuracion de los mock a usar
    const activeUser:ActiveUserInterface={
      userId:1,
      email:'test@example.com',
      name:'test User',
    };
    const shopName='shopName';
    const description= 'new post description';
    const createPost:CreatePostDto= {
      description:description
    };
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
    it('should create and save a new post successfully', async ()=>{
      const shop:Shop={
        shopId: 1,
          name: 'ShopName',
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
      const post:Post={
        postId:1,
        description:'new post description',  
        stars:4,
        image:'linkImagen',
        postedAt:new Date(),
        shop:new Shop,
      };
      //configuramos las respuetas de los metodos a usar
      shopServiceMock.getShopByName.mockResolvedValue(shop);
      postRepositoryMock.create.mockReturnValue(post);
      postRepositoryMock.save.mockResolvedValue(post);

      //llamamos al metodo newPost con los parametros esperados
      const result= await service.newPost(activeUser,createPost,shopName);
      
      expect(shopServiceMock.getShopByName).toHaveBeenCalledWith(shopName);
      expect(postRepositoryMock.create).toHaveBeenCalledWith({description,shop});
      expect(postRepositoryMock.save).toHaveBeenCalledWith(post); 
      expect(result).toBe(post);
    })//final it
    
    it('should throw NotFoundException if shop does not exist', async () => {
      //configuramos el mock para simular que la tienda no existe
      shopServiceMock.getShopByName.mockResolvedValue(null);

      //esperamos que al llamar al metodo con los parametros correcto arroje una exception
      await expect(service.newPost(activeUser, createPost, shopName)).rejects.toThrow(
        new NotFoundException(`Shop with name '${shopName}' not found`),
      );
    });

    it('should throw BadRequestException if user is not the shop owner', async () => {
     //mock del shop donde el propietario tiene un mail diferrente al de activeUser
      const shop = { user: { email: 'another@example.com' } } as Shop;
      //configuramos la respuesta del metodo para que devuelba un objeto shop con cualquier nombre
      //simula la respuesta del servicio como si la tienda existiera
      //pero con un propietario diferente
      shopServiceMock.getShopByName.mockResolvedValue(shop);
      
      //se llama al metodo y se verifica la exception
      await expect(service.newPost(activeUser, createPost, shopName)).rejects.toThrow(
        new BadRequestException('Only shop owner is able to create new post'),
      );
    }); 

    it('should throw BadRequestException if description is invalid', async () => {
      //configuramos el mock para indicar que el mail es del prpietario de shop
      const shop = { user: { email: activeUser.email } } as Shop;
      //configuramos el mock para que devuelba una tienda
      shopServiceMock.getShopByName.mockResolvedValue(shop);
      
      //mockeamos una descripcion invalida
      const invalidDto = { description: '' } as CreatePostDto;
      //ejecutamos el metodo newPost y esperamos que lance la exception
      await expect(service.newPost(activeUser, invalidDto, shopName)).rejects.toThrow(
        new BadRequestException('Description is required and must be a non-empty string'),
      ); 
    });

    it('should handle unexpected errors', async () => {
      const shop = { user: { email: activeUser.email } } as Shop; 
      shopServiceMock.getShopByName.mockResolvedValue(shop);
      postRepositoryMock.save.mockRejectedValue(new Error('Unexpected error'));

      await expect(service.newPost(activeUser, createPost, shopName)).rejects.toThrow(
        new BadRequestException('Failed to create a new post', 'Unexpected error'),
      );
    });
 

  });//final describe




});


//=========================================================
//FALTA TESTEAR
//=========================================================