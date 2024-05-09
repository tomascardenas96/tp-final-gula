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
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { profile } from 'console';

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
      // Defino todos los métodos que necesito en el mock de user.service
    };
    //mock de como debe qeudar guardado el objeto final para comparacion
    const newUser:User={
            userId:1,
            email:'test@example.com',
            name: 'Test User',
            password: 'password123',
            createdAt:new Date(),
            shop:[],
            cart:new Cart,
            profile:new Profile,
    };
    //con esto agrego el mock del metodo save a los metodos de user.service
    userRepositoryMock={
      ...baseUserRepositoryMock,
      save:jest.fn().mockResolvedValue(newUser)
    };
    
    profileServiceMock = {
      create:jest.fn().mockResolvedValue({} as Profile),//creo un objeto profile simulado
      findAll:jest.fn(),
      findOne:jest.fn(),
      update:jest.fn(),
      remove:jest.fn(),
      // Defino todos los métodos que necesito en el mock de ProfileService
    };


    cartServiceMock = {
      create:jest.fn().mockResolvedValue({} as Cart),//creo un objeto pcart simulado
      findAll:jest.fn(),
      findOne:jest.fn(),
      update:jest.fn(),
      remove:jest.fn(),
      // Defino los métodos que necesitas en tu mock de CartService
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

      //new profile creado para asignar a user
      /*const newProfile:Profile={
        profileId: 1,
        profilePicture: 'link',
        profileName: CreateUserDto.email,
        coverPhoto: 'coverFoto',
        location: CreateUserDto.location,
        birthDate: CreateUserDto.birthDate,
        user: new User
      };*/

      //creador profileDTO
      const newCreateProfileDTO:CreateProfileDto={
        profileName: CreateUserDto.email,
        location: CreateUserDto.location,
        birthDate: CreateUserDto.birthDate,
      }

      //new carrito creado para asignar a user
      const newCart:Cart={
        cartId:1,
        user: new User,
        food: new Array<FoodOnCart>,
        invoice: []
      };
      //creador de carritoDTO
      const createCartDto:CreateCartDto={

      }


      //objeto final creado
      const newCreatedUser:User={
        userId:1,
        email:CreateUserDto.email,
        name:CreateUserDto.name,
        password:CreateUserDto.password,
        createdAt:new Date(),
        shop:[],
        cart:new Cart,
        profile:new Profile,
      }
      //await cartServiceMock.create(),
      //await profileServiceMock.create(newCreateProfileDTO),
        //configuramos los mocks para simular el conportamiento de los servicios
        userRepositoryMock.create.mockResolvedValueOnce(newCreatedUser);//espero que el metodo crete resulva devolviendo newUSer;
        /*Al simular el comportamiento de userRepositoryMock.create, 
        necesitas asegurarte de que devuelva una promesa que se resuelva 
        con el nuevo usuario creado. Dado que newUser es un objeto, debemos 
        envolverlo dentro de una promesa para que se comporte correctamente. 
        Puedes hacer esto usando Promise.resolve(newUser) */

        //lo que espero
        console.log('objeto qeu espero recibir',newCreatedUser) 

        const result= await service.create(CreateUserDto);
        console.log('objeto que llega',result)//llega vacio cart y profile
        expect(result).toStrictEqual({//toStrictEqual, que realiza una comparación en profundidad de los objetos, asegurándose de que todas las propiedades y sus valores sean idénticos.
          ...newCreatedUser,
          createdAt:expect.any(Date),// Ignora la comparación de la propiedad createdAt
          cart:expect.any(Cart),// Asegura que la propiedad cart no esté vacía
          profile:expect.any(Profile),}) // Asegura que la propiedad cart no esté vacía
      
      /*NOTA: en realidad no pasa, lo que quiero demostrar es que llamando al metodo create
      de user.service y pasando como parametro CreteUserDto me creara un usuario qeu en sus propiedades
      contiene cart que se creara en el momento y ademas profile que hara lo msimo q cart.
      profile es creado ccon el metodo de userServiceProfile.create el cual es llamado en
      userService dentro del metodo create. 
      entonces al crear un usuario me debe crear un profile con las propiedades de ProfileCreteDTO
      y meter el obejto creado dentro de la propiedad profile del objeto user Creado. lo mismo hace cart
      o sea que objeto creado en userService.create debe contener un objeto profile y cart
      **** la prueba esta mal hecha ya que solo muestra que el obejto de entrada y de salida no son iguales.
      l que tengo qeu demostrar es que el obejto creado (user) contenga los obejtos profile y cart respectivamente*/
      
      
      });
  }) 
}); 
 
      