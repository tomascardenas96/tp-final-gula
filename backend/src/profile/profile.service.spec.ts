import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
//importo getRepositoryToken
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';


describe('ProfileService', () => {
  let service: ProfileService;
  let repository:Repository<Profile>;

  beforeEach(async () => {
    const ProfileRepositoryMock={
      create:jest.fn(),
      save:jest.fn(),
      findAll:jest.fn(),
      findOne:jest.fn(),
      update:jest.fn(),
      remove:jest.fn()
    };
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide:getRepositoryToken(Profile),
          useValue:ProfileRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    repository=module.get<Repository<Profile>>(getRepositoryToken(Profile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
