import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
//agrego importaciones
import { ProfileService } from './profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service:ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService,
        {
          provide:getRepositoryToken(Profile),//obtenemos el token del repositorio del perfil
          useClass:Repository,//simula un repositorio, se pdoria usar un mock
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service=module.get<ProfileService>(ProfileService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
