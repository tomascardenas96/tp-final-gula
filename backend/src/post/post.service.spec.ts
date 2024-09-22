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
import { BadGatewayException, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { error } from 'console';
import { GulaSocketGateway } from 'src/socket/socket.gateway';

describe('PostService', () => {
  let service: PostService;
  let postRepositoryMock:any;//definimos any para evistar problemas
  let shopServiceMock:Partial<jest.Mocked<ShopService>>;
  let userServiceMock:Partial<jest.Mocked<UserService>>;
  let socketsGatewaymock:Partial<jest.Mocked<GulaSocketGateway>>;  

  beforeEach(async () => {
    //creamos mocks para PostRepository, shopService
    const basePostRepositoryMock={
      newPost:jest.fn(),
      getAllPosts:jest.fn(),
      //recommendPost:jest.fn(),
      //unrecommendPost:jest.fn(),
      getPostsByShop:jest.fn(),
      deletePost:jest.fn(),
    }
    
    //creamos una extencion del objeto basePostRepositoryMock para
    //agregar metodos que son propios de nest y para agregarlos y utilizarlos
    //en PostRepositoryMock
    postRepositoryMock={
      ...basePostRepositoryMock,
      find:jest.fn(),
      create:jest.fn(),
      save:jest.fn(),
      trim:jest.fn(),
      findOne:jest.fn(),
      delete:jest.fn(),
    //agregar metodos que se van necesitando
    };

    //creamos el mock con los metodos de ShopService
    shopServiceMock={
      createNewShop:jest.fn(),
      getAllShops:jest.fn(),
      getShopByName:jest.fn(),
      getShopByProfileName:jest.fn(),
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
      getActiveUser:jest.fn(),
      // Defino todos los métodos que necesito en el mock de user.service
    };
    socketsGatewaymock={
      sendNewPost:jest.fn(),
    }

    //configuro el modulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService,
        GulaSocketGateway,
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
        },
        {
          provide:GulaSocketGateway,
          useValue:socketsGatewaymock
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
          shippingCost:20,
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
      postRepositoryMock.save.mockRejectedValue(new Error('Failed to create a new post'));

      await expect(service.newPost(activeUser, createPost, shopName)).rejects.toThrow(
        new BadRequestException('Failed to create a new post'),
      );
    });
  });//final describe


  describe('getAllPosts', () => {
    it('should return all posts with relations', async () => {
      const posts = [
        { id: 1, description: 'Post 1', shop: { id: 1, name: 'Shop 1' } },
        { id: 2, description: 'Post 2', shop: { id: 2, name: 'Shop 2' } },
      ];
      //simulamos que le metodo find devuelba una lista de posts
      (postRepositoryMock.find as jest.Mock).mockResolvedValue(posts);
      //llamamos al metodo getAllPosts
      const result = await service.getAllPosts();
      //esperamos que el metodo find sea llamado con el parametro correcto 
      expect(postRepositoryMock.find).toHaveBeenCalledWith({ relations: ['shop'] });
      //el resultado debe ser una lista de posts
      expect(result).toEqual(posts);
    });

    it('should throw a BadRequestException if an error occurs', async () => {
      //simulamos que el metodo find lanza un error 
      (postRepositoryMock.find as jest.Mock).mockRejectedValue(new BadRequestException('Error trying to get publications'));
      //se llama al metodo getAllpost del servicio y se espera que lanze una BadRequestException 
      await expect(service.getAllPosts()).rejects.toThrow(BadRequestException);  
      await expect(service.getAllPosts()).rejects.toThrow('Error trying to get publications');
    });
  });

  describe('getPostByShop',()=>{
    it('should return an array Posts if the shop is found',async ()=>{
      const profileName='shopname';
      const shopMock={shopId:1}as Shop;//mock de la tienda
      const postMock=[{postId:1},{postId:2}]as Post[];//array de post

      //configuracion de la prueba
      jest.spyOn(shopServiceMock,'getShopByProfileName').mockResolvedValue(shopMock);
      jest.spyOn(postRepositoryMock,'find').mockResolvedValue(postMock);

      //llamado al metodo del servicio
      const result=await service.getPostsByShop(profileName);
      expect(result).toEqual(postMock); 
    });//final it


    it('should throw NotFoundException if the shop is not found', async () => {
      const profilename = 'noExiste';
  
      // Mock de shopService para simular que no se encuentra la tienda
      jest.spyOn(shopServiceMock, 'getShopByProfileName').mockResolvedValue(null);
  
      // Verificamos que se lanza la excepción NotFoundException
      await expect(service.getPostsByShop(profilename)).rejects.toThrow(NotFoundException);
    });//final it

    it('should throw BadGatewayException on unexpected errors', async () => {
      const profilename = 'shopname';
  
      // Mock de shopService para lanzar un error inesperado
      jest.spyOn(shopServiceMock, 'getShopByProfileName').mockRejectedValue(new Error('Unexpected error'));
  
      // Verificamos que se lanza la excepción BadGatewayException
      await expect(service.getPostsByShop(profilename)).rejects.toThrow(BadGatewayException);
    }); 
  });//final describe



  describe('deletePost',()=>{
    it('should delete post when user is shop owner', async ()=>{
      //mock de los datos del usuario activo
      const activeUser={userId:1 }as ActiveUserInterface;

      const user={userId:activeUser.userId} as User;
      //mock de la publicacion que se desea eliminar

      const mockPost= {
        postId:1,
        shop:{
          user:{userId:1}as User 
        }as Shop
      }as Post

      //configuracion de la prueba
      //cuando se llame al metodo getActiveUser debe resolver con un usuario
      jest.spyOn(userServiceMock,'getActiveUser').mockResolvedValue(user);
      //cuando se llame al metodo findOne de typeOMR resolvera encontrando un Post
      jest.spyOn(postRepositoryMock,'findOne').mockResolvedValue(mockPost);

      //ejecutamos el metodo delete del servicio con los aprametros indicados
      const result=await service.deletePost(1,activeUser);//Id que se desea borrar e interface de usuario activo

      //verificamos que se haya llamado al emtodo delete con el postId correcto
      expect(postRepositoryMock.delete).toHaveBeenCalledWith(1);//numero de ID 
      expect(result).toEqual(mockPost)//verificamos que el resultado es el esperado
    });//final it

    it('should throw NotFoundException if post not found', async()=>{
      //mock del susuario
      const activeUser={userId:1}as ActiveUserInterface;

      //configuracion de la prueba
      //cuando se utilize el metodo de TypeOmr findOne no encontara un post
      //entonces devolvera null
      jest.spyOn(postRepositoryMock,'findOne').mockResolvedValue(null);

      //ejecutamos el metodo y verificamos que lanze la excepcion
      await expect(service.deletePost(1,activeUser)).rejects.toThrow(NotFoundException);
    });//final IT

    it('should throw unauthorizedException if user is not the shop owner',async ()=>{
      //mock de usuariuo activo
      const activeUser={userId:1} as ActiveUserInterface;
      const user={userId:activeUser.userId} as User;
      //mock de una publicacion donde el dueño de la tienda es diferente
      const mockPost={
        postId:1,
        shop:{
          user:{userId:2} as User //el ID de este usuario es diferente al activo
        }as Shop
      }as Post;
      
      //configuracion de la prueba
      //cuando se utiliza el metodo findOne encuntra el post que se desea borrar
      jest.spyOn(postRepositoryMock,'findOne').mockResolvedValue(mockPost);
      //utilizara los parametros para buscar el ussuario activo.
      jest.spyOn(userServiceMock,'getActiveUser').mockResolvedValue(user);
      
      //ejecutamos el metodo y verificamos que lanze la excepcion
      //NOTA: comparara los id de Post y del usuario y al ser distintos lanzara la exception
      await expect(service.deletePost(1,activeUser)).rejects.toThrow(UnauthorizedException);
    });//final it

    it('should throw badGatewayException on unexpected error',async ()=>{
      //mock del usuario activo
      const activeUser={userId:1}as ActiveUserInterface;

      //configuracion de la prueba
      //al utilizar findOne lanzara un error inesperado
      jest.spyOn(postRepositoryMock,'findOne').mockRejectedValue(new Error('Unexpected error'));

      //llamamos al metodo del servicio y verificamos que lanze la excepcion
      await expect(service.deletePost(1,activeUser)).rejects.toThrow(BadGatewayException); 
    });//final it
 });//final describe 

});


//=========================================================
//FALTA TESTEAR
//unrecommenderpost
//recommenderPost
//=========================================================