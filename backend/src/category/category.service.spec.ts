import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Food } from 'src/food/entities/food.entity';
import { BadGatewayException, ForbiddenException } from '@nestjs/common';


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
  describe('findAll',()=>{
    it('should return an array of categories',async ()=>{

      //mock de las categorias
      const categories:Category[]= [{
        categoryId:1,
        description: 'Pasta',
        icon:'link',
        food: [],
      },{
        categoryId:2,
        description:'Panchos',
        icon:'link',
        food:[]
      }];
      //configuro al mock para que cuando se llame al metodo find devuelba un array de categorias
      jest.spyOn(categoryServiceMock,'find').mockResolvedValue(categories);

      //llamado al servicio
      expect(await service.findAllCategories()).toBe(categories);
      expect(categoryServiceMock.find).toHaveBeenCalled();

    })//final it
    
    it('should throw a ForbiddenException if an error occurs', async () => {
      //configuramos el mock para que resuelva con un error
      jest.spyOn(categoryServiceMock, 'find').mockRejectedValue(new ForbiddenException);
      //llamado al servicio
      //testeamos que retorne ForbiddenException si ocurre un error 
      await expect(service.findAllCategories()).rejects.toThrow(ForbiddenException);
    }); 
  });//final describe

  describe('findCategoryByName',()=>{
    it('should return a category if found',async ()=>{
      //mock de las categorias
      const categories:Category[]= [{
        categoryId:1,
        description: 'Pasta',
        icon:'link',
        food: [],
      },{
        categoryId:2,
        description:'Panchos',
        icon:'link',
        food:[]
      }];

      const query='Pasta';
      //configuramos el mock para que cuand se llame al metodo findOne resuelva con una categoria
      jest.spyOn(categoryServiceMock,'findOne').mockResolvedValue(categories[0]);//debe devolver el obejtoq eu contiene "Pasta"
      //llamado al servicio
      expect(await service.findCategoryByName(query)).toBe(categories[0]);
      //esperamos que el mock sea llamado con el parametro que hace match con la descripcion
      expect(categoryServiceMock.findOne).toHaveBeenCalledWith({where: { description:'Pasta'}});
    });//final it

    it('should throw a BadGatewayException if an error occurs', async () => {
      jest.spyOn(categoryServiceMock, 'findOne').mockRejectedValue(new BadGatewayException);

      await expect(service.findCategoryByName('Italian')).rejects.toThrow(BadGatewayException);
    });
  
  });//final describe
});
 