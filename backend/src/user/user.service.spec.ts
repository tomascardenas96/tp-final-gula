import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
//agregado para intentar solucionar error
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppTestModule } from 'Test_Config/App.Test.Module';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //agregado
      imports:[
        AppTestModule,//usa el modulo de prueba en lugar del original
        TypeOrmModule.forFeature([User]),
      ],//importa el modulo q contiene userService
      providers: [UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

