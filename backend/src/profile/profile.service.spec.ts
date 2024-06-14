import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
//importaciones necesarias
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { BadGatewayException,NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { create } from 'domain';

describe('ProfileService', () => {
  let service: ProfileService;
  //let repository:Repository<Profile>;
  let ProfileRepositoryMock: any;//definimos any para evitar problemas

  beforeEach(async () => {
    const BaseProfileRepositoryMock={
      create:jest.fn(),
      save:jest.fn(),
      findAll:jest.fn(),
      findOne:jest.fn(),
      //update:jest.fn(),
      //remove:jest.fn()
    };

    ProfileRepositoryMock={
      ...BaseProfileRepositoryMock,
      create:jest.fn(),
      findProfileByUser:jest.fn(),
      updateActiveUserProfile:jest.fn(),
    };
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide:getRepositoryToken(Profile),//utilizamos GetRepositoryToken para obtener el token del repositorio Profile
          useValue:ProfileRepositoryMock,// Proporcionamos nuestro mock para ProfileRepository
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    //repository=module.get<Repository<Profile>>(getRepositoryToken(Profile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create',()=>{
    it('should crear a new profile succesfully', async()=>{
      //creamos un mock de createDTO
      const createProfileDto:CreateProfileDto={
        profileName:'test NameProfile',
        location:'testLocation',
        birthDate:'01/01/01',
      };
      //mock de como debe quedar creado el profile 
      const profile:Profile={
        profileId:1,
        profilePicture:'PhotoLINK',
        coverPhoto:'0',
        ...createProfileDto,
        user:null,
      };
      //configuracion de los mock
      //el emtodo create de profile debe retornar un perfil;
      (ProfileRepositoryMock.create as jest.Mock).mockReturnValue(profile);
      //cuando se use el emtodo save debe resolver guardand un perfil
      (ProfileRepositoryMock.save as jest.Mock).mockResolvedValue(profile);
      
      //llamamos al metodo y le pasamos los parametros esperados
      const result= await service.create(createProfileDto);
       
      //verificamos que los metodos create y save sean llamados con ls parametros correctos
      expect(ProfileRepositoryMock.create).toHaveBeenCalledWith(createProfileDto);
      expect(ProfileRepositoryMock.save).toHaveBeenCalledWith(profile);
      //verificamos que el resultado obtenido es igual a un perfil
      expect(result).toEqual(profile); 
    });//final it
  });//final describe

  describe('findProfileByUser',()=>{
    it('should find and return a profile by user id',async()=>{
      //mock de un usuario 
      const user: User = {userId: 1} as User;
     
     
      //mock de un profile
     const profile:Profile={
      profileId:1,
      profilePicture:'PhotoLINK',
      profileName:'',
      coverPhoto:'0',
      location:'test Location',
      birthDate:'01/01/01',
      user:user,
    };
    //configuramos los valosres esperados a usaar los metodos
    //cuando se use el metodo findOne esperamos que resulva encontrando un perfil
    (ProfileRepositoryMock.findOne as jest.Mock).mockResolvedValue(profile);

    //llamamos al metodo del servicio con el parametro correcto
    const result= await service.findProfileByUser(user);
    //verificamos que profileId sea un numero(mismo que userId) y con este busque el perfil
    expect(ProfileRepositoryMock.findOne).toHaveBeenCalledWith({ where: { profileId: user.userId } })
    //verificamos que el resultado sea el perfil buscado
    expect(result).toEqual(profile);    
    });//final it
    
    it('should throw a BadGatewayException if an error occurs', async () => {
      const user: User = { userId: 1 } as User;
      
      (ProfileRepositoryMock.findOne as jest.Mock).mockRejectedValue(new BadGatewayException('ProfileService: Error trying to find profile by id')); 
      
      await expect(service.findProfileByUser(user)).rejects.toThrow(BadGatewayException);
      await expect(service.findProfileByUser(user)).rejects.toThrow('ProfileService: Error trying to find profile by id');
    }); 
  });//final describe
    

  describe('updateActiveUserProfile',()=>{
    it('should find and return the updated profile',async()=>{
      //mock de un usuario
      const user: User = { userId: 1 } as User;
      //mock de un perfil a actualizar
      const profile: Profile = {
        profileId: 1,
        profilePicture: 'PhotoLINK',
        profileName: 'Old Name',
        coverPhoto: '0',
        location: 'old Location',
        birthDate: '01/01/01',
        user: user,
      };
      //mock de datos a aactualizar
      const updatedProfileDto: UpdateProfileDto = {
        profileName: 'New Name',
        location: 'New Location',
        birthDate: '02/02/02',
      };

      //mock de un nuevo archivo de foto
      const file= {filename:'newPhoto.jpg'} as Express.Multer.File;
      /*nota:Esta línea crea un objeto file que simula un archivo subido
      El objeto file tiene una propiedad filename con el valor 'newPhoto.jpg'.
      as Express.Multer.File indica que file debe ser tratado como un objeto del
      tipo Express.Multer.File, que es el tipo que Multer utiliza para los archivos 
      subidos.*/

      //configuracion de respuestas esperadas de los mock
      
      //cuando se invoca al metodo findOne debe resolver devolviendo una promesa del tipo profile
      (ProfileRepositoryMock.findOne as jest.Mock).mockResolvedValue(profile);
      //cuando cree el nuevo perfil(actualize) debe retornar un nuevo objeto perfil con propiedades conbinadas 
      (ProfileRepositoryMock.create as jest.Mock).mockReturnValue({
        ...profile,//propiedades originales
        ...updatedProfileDto,//propiedades de DTO actualizado
        profilePicture:file.filename,//actualiza la propiedad 'profilePicture' con el nombre del archivo simulado 'newPhoto.jpg'
      });
      //cuando se invoca al metodo save debe resolver guardando los datos ingresados
      //##revisar comentario
      (ProfileRepositoryMock.save as jest.Mock).mockResolvedValue({
        ...profile,
        ...updatedProfileDto,
        profilePicture: file.filename,
      });
      //llamado al metodo del servicio
      const result= await service.updateActiveUserProfile(file,user,updatedProfileDto);

      //verificamos que findOne sea llamado con el aprametro correcto
      expect(ProfileRepositoryMock.findOne).toHaveBeenCalledWith({where:{user}});
      //verificamos que el metodo create sea llamado con los parametros correctos
      expect(ProfileRepositoryMock.create).toHaveBeenCalledWith({
        ...profile,
        profileName:updatedProfileDto.profileName,
        location:updatedProfileDto.location,
        birthDate:updatedProfileDto.birthDate,
        profilePicture:file.filename,
      });
      //verificamos que el metodo save sea llamado con los parametros correctos
      expect(ProfileRepositoryMock.save).toHaveBeenCalledWith({
        ...profile,
        profileName:updatedProfileDto.profileName,
        location:updatedProfileDto.location,
        birthDate:updatedProfileDto.birthDate,
        profilePicture:file.filename,
      });
      //verificamos que el resultado obtenido sea igual al actualizado
      expect(result).toEqual({
        ...profile,
        profileName:updatedProfileDto.profileName,
        location:updatedProfileDto.location,
        birthDate:updatedProfileDto.birthDate,
        profilePicture:file.filename,
      })
    });//final it

    it('should throw a NotFoundException if profile is not found', async () => {
     //simulamos un usuario
      const user: User = { userId: 1 } as User;
      
      //mock de datos actualziados
      const updatedProfileDto: UpdateProfileDto = {
        profileName: 'New Name',
        location: 'New Location',
        birthDate: '02/02/02',
      };
      //configuracion de respuesta del mock
      //indicamos que no encuentra un usuario
      (ProfileRepositoryMock.findOne as jest.Mock).mockResolvedValue(null);

      //esperamos qeu si pasamos un usuario nulo devuelba una exception
      await expect(service.updateActiveUserProfile(null, user, updatedProfileDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw a BadGatewayException if an error occurs', async () => {
      //mock de un usuario
      const user: User = { userId: 1 } as User;
      //mock de los datos actualziados
      const updatedProfileDto: UpdateProfileDto = {
        profileName: 'New Name',
        location: 'New Location',
        birthDate: '02/02/02',
      };
      //configuracion de la prueba
      //configuramos que ubo un error de conecccion con la base de datos
      //y devuelbe un badgateway
      (ProfileRepositoryMock.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      //esperamos que si perfil es null arroje BadGateWayException
      await expect(
        service.updateActiveUserProfile(null, user, updatedProfileDto),
      ).rejects.toThrow(BadGatewayException);
      //esperamos qeu el mensjae de error sea el indicado
      await expect(
        service.updateActiveUserProfile(null, user, updatedProfileDto),
      ).rejects.toThrow('Profile service: Error trying to update active user profile information');
    });
  
  });//final describe
});
