import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
//agrego importaciones
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { Readable } from 'stream';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { UpdateProfileDto } from './dto/update-profile';

describe('UserController', () => {
  let controller: UserController;
  let service:UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        UserService,
        JwtService,
        ProfileService,
        CartService,
        {
          provide:getRepositoryToken(User),//obtenemos el token del repositorio del user
          useClass:Repository,//simula un repositorio, se podria usar un mock
        },
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository,
        },
        {
          provide:getRepositoryToken(Profile),
          useClass:Repository,
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service=module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateActiveUserProfile', () => {
    it('should update profile successfully', async () => {
      // Simula el archivo de carga
      const file =  {
        filename: 'profile-pic.jpg',
        path: '',
        mimetype: 'image/jpg',
        size: 1024,//tamaño simulado del archivo
        buffer: Buffer.from(''),
        fieldname: '',
        originalname: 'profile-pic.jpg',
        encoding: 'utf-8',
        stream: new Readable(),
        destination: '',
      };

      // Simula el usuario activo
       const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      }; 
      const updatedProfile:UpdateProfileDto = {
        file:file,
        profileName:'new profile name',
        location:'new location',
        birthDate:'2024-05-29',
      }; // Simula el perfil actualizado
      const updatedProfileResult = {} as Profile; // Simula el perfil actualizado devuelto

      jest.spyOn(service, 'updateActiveUserProfile').mockResolvedValueOnce(updatedProfileResult);

      const result = await controller.updateActiveUserProfile(file, activeUser, updatedProfile);

      expect(result).toBe(updatedProfileResult);
      expect(service.updateActiveUserProfile).toHaveBeenCalledWith(file, activeUser, updatedProfile);
    });

    it('should handle errors from UserService.updateActiveUserProfile', async () => {
      // Simula el archivo de carga
      const file =  {
        filename: 'file',
        path: '',
        mimetype: 'image/jpg',
        size: 1024,//tamaño simulado del archivo
        buffer: Buffer.from(''),
        fieldname: '',
        originalname: 'profile-pic.jpg',
        encoding: 'utf-8',
        stream: new Readable(),
        destination: '',
      };
      // Simula el usuario activo
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      }; 
      const updatedProfile = {
        file:file,
        profileName:'new profile name',
        location:'new location',
        birthDate:'2024-05-29',
      }; // Simula el perfil actualizado

      jest.spyOn(service, 'updateActiveUserProfile').mockRejectedValueOnce(new BadRequestException('Error updating profile'));

      await expect(controller.updateActiveUserProfile(file, activeUser, updatedProfile)).rejects.toThrowError(BadRequestException);
    });
  });
});


