import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service:CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        JwtService,
        {
          provide:getRepositoryToken(Category),
          useClass:Repository,
        }
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service=module.get<CategoryService>(CategoryService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('findAll', () => {
    it('should call categoryService.findAllCategories and return the result', async () => {
      //mock de las categorias
      const categories:Category[]= [{
        categoryId:1,
        description: 'Pasta',
        food: [],
      },{
        categoryId:2,
        description:'Panchos',
        food:[]
      }];
      //configuramos el mock para que cuando llame al metodo findAllCategories resuelva con un array de categorias
      jest.spyOn(service, 'findAllCategories').mockResolvedValue(categories);
      //esperamos que cuando el controlador ejecute findAll devuelba un array de categorias
      expect(await controller.findAll()).toBe(categories);
      //esperamos que el metodo findAllCategories sea llamado
      expect(service.findAllCategories).toHaveBeenCalled();
    });
  });
});
