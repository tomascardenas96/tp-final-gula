import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // Importa getRepositoryToken desde @nestjs/typeorm
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProfileService } from '../profile/profile.service';
import { CartService } from '../cart/cart.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryMock:any;//definimos any para evistar probloemas con las propiedades
  let profileServiceMock:Partial<jest.Mocked<ProfileService>>;
  let cartServiceMock:Partial<jest.Mocked<CartService>>;
 
  beforeEach(async () => {
    //creamos mocks para UserRepository, ProfileService y CartService
    const baseUserRepositoryMock = {
      create: jest.fn(),//mock para el metodo Create 
      findByEmail: jest.fn(),
      findByEmailWithPassword: jest.fn(),
      findByUserName: jest.fn(),
      findUserByQuery: jest.fn(),
      //irian todos los nombre de los metodos del user.service
    };
    const newUser:User={
            userId:1,
            email: 'existingMail.com',
            name: 'Existing User',
            password: 'password123',
            createdAt:new Date(),
            shop:[],
            cart:null,
            profile:null
    };

    userRepositoryMock={
      ...baseUserRepositoryMock,
      save:jest.fn().mockResolvedValue(newUser)
    };//con esto agrefo el mock del metodo save a los metodos de user.service
 
    profileServiceMock = {
      create:jest.fn().mockResolvedValue({} as Profile),
      findAll:jest.fn(),
      findOne:jest.fn(),
      update:jest.fn(),
      remove:jest.fn(),
      //creo un objeto profile simulado
      // Define los métodos que necesitas en tu mock de ProfileService
    };


    cartServiceMock = {
      create:jest.fn().mockResolvedValue({} as Cart),
      findAll:jest.fn(),
      findOne:jest.fn(),
      update:jest.fn(),
      remove:jest.fn(),
      // Define los métodos que necesitas en tu mock de CartService
    };

    //configuramos el modulo de prueba para los mocks
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),//utilizamos GetRepositoryToken para obtener el token del repositorio de User
          useValue: userRepositoryMock,// Proporcionamos nuestro mock para UserRepository
        },
        {
          provide: ProfileService,
          useValue: profileServiceMock,
        },
        {
          provide: CartService,
          useValue: cartServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);//obtenemos la instancia del servicio
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create',()=>{
    it('should create a new User',async ()=>{
      //creamos un nuevo usuario:CreateDTO

      const CreateUserDto={
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        location: 'Test Location',
        birthDate: '05/10/1990',
      };

      //nuevo usuario creado
      const newUser:User={
        ...CreateUserDto,
        userId:1,
        createdAt:new Date(),
        shop:[],
        cart:null,
        profile:null     
      };
         
      const newProfile:Profile={
        profileId: 1,
        profilePicture: 'link',
        profileName: CreateUserDto.email,
        coverPhoto: 'coverFoto',
        location: CreateUserDto.location,
        birthDate: CreateUserDto.birthDate,
        user: new User
      };

      const newCart:Cart={
        cartId:1,
        user: new User,
        food: new Array<FoodOnCart>,
        invoice: []
      };

      const newCreatedUser:User={
        ...CreateUserDto,
        userId:1,
        createdAt:new Date(),
        shop:[],
        cart:newCart,
        profile:newProfile,
      }

        //configuramos los mocks para simular el conportamiento de los servicios
        userRepositoryMock.create.mockResolvedValueOnce(newUser);//espero que el metodo crete resulva devolviendo newUSer;
        /*Al simular el comportamiento de userRepositoryMock.create, 
        necesitas asegurarte de que devuelva una promesa que se resuelva 
        con el nuevo usuario creado. Dado que newUser es un objeto, debemos 
        envolverlo dentro de una promesa para que se comporte correctamente. 
        Puedes hacer esto usando Promise.resolve(newUser) */



        const result= await service.create(CreateUserDto);

        expect(result).toBe(newCreatedUser) 
        /*expect(result).toEqual(expect.objectContaining({
          userId: 1,
          email: 'test@example.com',
          name: 'Test User',
          password: 'password123',
          location: 'Test Location',
          birthDate: '05/10/1990',
          createdAt: expect.any(Date), // Se espera que la fecha de creación sea de tipo Date
          shop: [],
          cart: newCart,
          profile: newProfile,
        }));*/
        expect(userRepositoryMock.create).toHaveBeenCalledWith(CreateUserDto)
      });
  }) 
}); 

 