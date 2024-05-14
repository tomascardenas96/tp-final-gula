import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
//agrego importaciones
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { PostService } from 'src/post/post.service';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Post } from 'src/post/entities/post.entity';
import { JwtService } from '@nestjs/jwt';



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
});
