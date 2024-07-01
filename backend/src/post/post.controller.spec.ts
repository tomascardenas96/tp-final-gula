import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
//importaciones necesarias
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { ShopService } from 'src/shop/shop.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { JwtService } from '@nestjs/jwt';
import { GulaSocketGateway } from 'src/socket/socket.gateway';


describe('PostController', () => {
  let controller: PostController;
  let service:PostService;

  beforeEach(async () => {
    const postServiceMock={
      newPost:jest.fn(),
      getAllPosts:jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide:PostService,
          useValue:postServiceMock,
        },
        //PostService,
        UserService,
        ShopService,
        ProfileService,
        CartService,
        JwtService, 
        GulaSocketGateway,
        {
          provide:getRepositoryToken(Post),//obtenemos el token del repositorio de Post
          useClass:Repository,
        },
        {
          provide:getRepositoryToken(User),
          useClass:Repository,
        },
        {
          provide:getRepositoryToken(Shop),
          useClass:Repository, 
        },
        {
          provide:getRepositoryToken(Profile),
          useClass:Repository, 
        },
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository,
        }],
    }).compile();

    controller = module.get<PostController>(PostController);
    service=module.get<PostService>(PostService); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('newPost',()=>{
    it('should call postService.newPost with correct parameters',async ()=>{
      //mock de datos de usuario activo
      const user:ActiveUserInterface={
        userId: 1, 
        email: 'test@example.com', 
        name: 'test user'};

      //mock de la creacion de un post
      const createPostDto: CreatePostDto = {
        description: 'New Post Description' };
      
      //mock del nombre de la tienda
      const shopName= 'shopName';

      await controller.newPost(user,createPostDto,shopName);

      expect(service.newPost).toHaveBeenCalledWith(user,createPostDto,shopName); 
    });
  });//final describe

  describe('getAllPosts', () => {
    it('should call postService.getAllPosts', async () => {
      // configuramos el mock para que el método getAllPosts del servicio no lance errores
      (service.getAllPosts as jest.Mock).mockResolvedValue([]);

      await controller.getAllPosts();

      expect(service.getAllPosts).toHaveBeenCalled();
    });
  });
});
  