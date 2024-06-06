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
});
