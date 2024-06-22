import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';


describe('CategoryService', () => {
  let service: CategoryService;
  //creo instancias mock de los distintos servicios a utilizar
  let categoryServiceMock:any;

  beforeEach(async () => {
    //base de method para el mock de categoryService
    const basecategoryServiceMock={
      create:jest.fn(),//aun sin uso
      find:jest.fn(),
      findOne:jest.fn(),
    };
    //mock que contiene los metodos del servicio categoryService
    categoryServiceMock={
      ...basecategoryServiceMock,
      findAllCategories:jest.fn(),
      findCategoryByName:jest.fn(),
    }

    //hirian conecciones a otra tabla,fijate en entidad? OneToOne
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide:getRepositoryToken(Category),
          useValue:categoryServiceMock,
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
