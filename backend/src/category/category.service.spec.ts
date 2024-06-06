import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';


describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const categoryRepositoryMock={
      create:jest.fn(),
      findAllCategories:jest.fn(),
    };
    //hirian conecciones a otra tabla,fijate en entidad? OneToOne
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide:getRepositoryToken(Category),
          useValue:categoryRepositoryMock,
        }
        //en caso de que vayan agregamos aca los provider
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
