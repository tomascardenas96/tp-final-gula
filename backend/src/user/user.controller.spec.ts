import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
//agrego importaciones
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { CartService } from 'src/cart/cart.service';


describe('UserController', () => {
  let controller: UserController;
  let service:UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        UserService,
        ProfileService,
        CartService,
        {
          provide:getRepositoryToken(User),//obtenemos el token del repositorio del user
          useClass:Repository,//simula un repositorio, se podria usar un mock
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service=module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
