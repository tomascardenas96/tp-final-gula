import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
//agregado para intentar solucionar error
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('UserService', () => {
  let service: UserService;
//agrego
  let userRepository:Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //agregado
      imports:[UserModule],//importa el modulo q contiene userService
      providers: [UserService,
      //agregado
     {
       provide:getRepositoryToken(User),
       useClass:Repository,
     },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    //agregado
    userRepository=module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
