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
import { BadGatewayException, BadRequestException, NotFoundException } from '@nestjs/common';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { Readable } from 'stream';
import { UpdateProfileDto } from './dto/update-profile';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryMock:any;//definimos any para evistar probloemas con las propiedades
  let profileServiceMock:any;//Partial<jest.Mocked<ProfileService>>;
  let cartServiceMock:Partial<jest.Mocked<CartService>>;
 
  beforeEach(async () => {
    //creamos mocks para UserRepository, ProfileService y CartService
    const baseUserRepositoryMock = {
      create: jest.fn(),//mock para el metodo Create 
      findByEmail: jest.fn(),
      findByEmailWithPassword: jest.fn(),
      findByUserName: jest.fn(),
      findUserByQuery: jest.fn(),
      findProfileByActiveUser:jest.fn(),
      updateActiveUserProfile:jest.fn(),
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
      save:jest.fn().mockResolvedValue(newUser),
      find:jest.fn(),//iniciamos el mock con una funcion vacia
      findOne:jest.fn(),//iniciamos un mock con una funcion vacia
      findOneBy:jest.fn(),//iniciamos un mock con una funcion vacia
    };
    
    const baseProfileServiceMock={
      save:jest.fn(),
      findOne:jest.fn(),
      //se peuden agregar mas metodos
    }

    profileServiceMock = {
      ...baseProfileServiceMock,
      create:jest.fn().mockResolvedValue({} as Profile),//creo un objeto profile simulado
      findProfileByUser:jest.fn(),
      updateActiveUserProfile:jest.fn(), 
      //findAll:jest.fn(),
      //findOne:jest.fn(),
      //update:jest.fn(),
      //remove:jest.fn(),
      // Defino todos los métodos que necesito en el mock de ProfileService
    };


    cartServiceMock = {
      create:jest.fn().mockResolvedValue({} as Cart),//creo un objeto pcart simulado
      //findAll:jest.fn(),
      //findOne:jest.fn(),
      //update:jest.fn(),
      //remove:jest.fn(),
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
/*====================================================================================================================== */
//Create Method
/*====================================================================================================================== */

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
        //configuramos los mocks para simular el conportamiento de los servicios
        userRepositoryMock.create.mockResolvedValueOnce(newCreatedUser);//espero que el metodo crete resulva devolviendo newUSer;
        /*Al simular el comportamiento de userRepositoryMock.create, 
        necesitas asegurarte de que devuelva una promesa que se resuelva 
        con el nuevo usuario creado.*/

        //lo que espero
       // console.log('objeto qeu espero recibir',newCreatedUser) 

        const result= await service.create(CreateUserDto);
       // console.log('objeto que llega',result)//llega vacio cart y profile
        expect(result).toStrictEqual({//toStrictEqual, que realiza una comparación en profundidad de los objetos, asegurándose de que todas las propiedades y sus valores sean idénticos.
          ...newCreatedUser,
          createdAt:expect.any(Date),// Ignora la comparación de la propiedad createdAt
          cart:expect.any(Cart),// Asegura que la propiedad cart no esté vacía
          profile:expect.any(Profile),}) // Asegura que la propiedad cart no esté vacía
    });
  });
  
  /*====================================================================================================================== */
  //FindUserByQuery Method
  /*====================================================================================================================== */

  //method findUserByQuery driving error 🤣
  describe('findUserByQuery',()=>{
    it('should retunr users matching the query',async()=>{
      //simulamos una cosulta que coincide con usuarios existentes
      const query='Adrian';

      //configuramos el mock del repositorio para que devulva usuarios
      userRepositoryMock.find.mockResolvedValueOnce([
        { userId:1,
          email:'adrian@example.com',
          name:'adrian gomez',
          password:'password123',
          createdAt:new Date(),
          shop:[],
          cart:new Cart,
          profile:new Profile,},
        
        { userId:2,
          email:'rodriguez@example.com',
          name:'adrian rodriguez',
          password:'password123',
          createdAt:new Date(),
          shop:[],
          cart:new Cart,
          profile:new Profile,}
      ]);
      //ejecutamos el metodo y esperamos que devuelva los 
      //usuarios que coinciden con la consulta
      const result= await service.findUserByQuery(query);
      expect(result).toHaveLength(2);//comprobamos que se devuelban dos usuarios que coinciden con la query
      expect(result).toContainEqual(expect.objectContaining({name:'adrian gomez'}));
      expect(result).toContainEqual(expect.objectContaining({name:'adrian rodriguez'}));
    });
  
    it('should throw a badRequestException if an error occurs',async()=>{
      const query= 'adrian';//simulamos consulta

      //configuramos el mock del repositorio para que lance una exception
      userRepositoryMock.find.mockRejectedValueOnce(new Error('Database error'));

      //ejecutamos el metodo y esperamos que lance una badRequestException
      await expect(service.findUserByQuery(query)).rejects.toThrow(BadRequestException);
    });
  });//describe 
  
  /*====================================================================================================================== */
  //findByEmailWithPassword method
  /*====================================================================================================================== */
  describe('findByEmailWithPassword',()=>{
    it('should return user with specified email and selected fields', async()=>{
      //mock del usuario creado
      const userCreated:User={
        userId:1,
        email:'test@example.com',
        name:'test user',
        password:'password123',
        createdAt:new Date(),
        shop:[],
        cart:new Cart,
        profile:new Profile,
      }
      //mock que ingresara el usuario
      const email= 'test@example.com'

      //configuramos el comportamiento del mock del repositorio
      //para que cuando se llame al metodo findOne y se le pase algo responda con un usuario creado
      userRepositoryMock.findOne.mockResolvedValueOnce(userCreated);

      //llamamos al metodo fiindByEmailWithPassword
      const result= await service.findByEmailWithPassword(email);

      //comprobamos que se llamo al metodo findOne con los parametros correctos
      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
        where:{email},
        select:['userId','email','name','password','createdAt']
      });
      expect(result).toEqual(userCreated); 
    });//final IT

    it('should throw BadRequestException if an error occurs during database operation', async () => {
      // Mock del correo electrónico para provocar un error
      const email = 'test@example.com';

      // Configurar el comportamiento del mock del repositorio para que arroje un error
      userRepositoryMock.findOne.mockRejectedValueOnce(new BadRequestException('Database error'));

      // Llamar al método findByEmailWithPassword y esperar que arroje una excepción
      await expect(service.findByEmailWithPassword(email)).rejects.toThrowError(BadRequestException);
    });
  });//final describe

  /*====================================================================================================================== */
//findByEmail method
/*====================================================================================================================== */
  describe('findByEmail',()=>{
    it('should return user with specific email',async()=>{
      //mock del mail a buscar
      const email='test@example.com';
      //usuario creado en la database y se espera como resultado
      const expectedUser: User={
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        createdAt: new Date(),
        shop:[],
        cart: new Cart,
        profile: new Profile,
      };

      //configuracion de mock, esperamos que resuelva la promesa con expeectedUser
      userRepositoryMock.findOneBy.mockResolvedValueOnce(expectedUser);

      //llamamos al metodo findByEmail
      const result= await service.findByEmail(email);

      expect(result).toEqual(expectedUser);//esperamos que el resultado sea un usuario con email requerido
      //verificamos que el metodo findOneBy sea llamado con el campo email 
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({email})
    });

    it('should return null if user with specific email does not exist', async ()=>{
      //mokeamos el email inexistente
      const email= 'noExistingEmail@example.com';
      //configuramos el mock para que resulva la promesa con Null
      userRepositoryMock.findOneBy.mockResolvedValueOnce(null);
      //llamamos al metodo del serrvice
      const result= await service.findByEmail(email);

      expect(result).toBeNull();
      //verificamos que el metodo findOneBy haya sido llamado con un obejto que contenga la propiedad EMAIL
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({email});
    });
  });

  describe('findByUserName',()=>{
    it('should return a user when a matching name is found',async ()=>{
      //mock del nombre del usuario
      const name='Test User';
      //usuario creado en la database y se espera como resultado
      const expectedUser: User={
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        createdAt: new Date(),
        shop:[],
        cart: new Cart,
        profile: new Profile,
      };
      //configuramos el mock, esperamos que resuelva la promesa con el expectedUSer
      userRepositoryMock.findOneBy.mockResolvedValueOnce(expectedUser);

      //invocamos al metodo findByUserName y esperamos el resultado
      const result= await service.findByUserName(name);
      //verificamos que el metodo findOneBy haya sido llamado con el nombre correcto
      expect(result).toEqual(expectedUser);
    });

    it('should return null when no matching nam,e is found', async()=>{
      //definimos un nombre que no estarra en la database
      const name= 'NonExisting name';

      //configuramos el comportamiento del mock parra que devuelba null
      userRepositoryMock.findOneBy.mockResolvedValueOnce(null);
     
      //llamamos al metodo del userSevice findByUserName y esperamos el resultado
      const result= await service.findByUserName(name);

      //verificamos que el metodo findOneBy haya sido llamado con el nombre correcto
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({name});
      expect(result).toBeNull()
      
    })
  });
  /*====================================================================================================================== */
  //findProfileByActiveUser
  /*====================================================================================================================== */
  describe('findProfileByActiveUser',()=>{
    it('should return profile for active user', async()=>{
      //mock de la interface de un user activo
      const activeUser: ActiveUserInterface={
        userId:1,
        email:'test@example.com',
        name:'test user',
      };
      //mock del user activo
      const user:User={
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        createdAt: new Date(),
        shop: [],
        cart: null,
        profile: null,
      };
      //mock del profile del usuario
      const profile:Profile={
        profileId:1,
        profilePicture:'photoUser',
        profileName:'Test user',
        coverPhoto:'photo',
        location:'location test',
        birthDate:'date',
        user:user,
      };
      //configuracion del test
      //al llamar al metodo findByEmail tieen qeu devolver un usuario
      jest.spyOn(service,'findByEmail').mockResolvedValueOnce(user);
      //al llamar al metodo findProfileByUser tiene q devolver un profile
      jest.spyOn(profileServiceMock,'findProfileByUser').mockResolvedValueOnce(profile);

      //llamada al metodo findProfileActiveUser 
      const result= await service.findProfileByActiveUser(activeUser);

      //esperamos que..
      expect(result).toEqual(profile);
      expect(service.findByEmail).toHaveBeenCalledWith(activeUser.email);
      expect(profileServiceMock.findProfileByUser).toHaveBeenCalledWith(user);
    });

    it('should throw notFoundException when user is not found', async()=>{
      //mock de un interface de usuario activa
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'notfound@example.com',
        name: 'Test User',
      };

      //configuracion de la respuesta esperada 
      //esperamos que al buscar el ususario el metodo devuelba NULL
      jest.spyOn(service,'findByEmail').mockResolvedValueOnce(null);
      //esperamos que lanse una excepcion
      await expect(service.findProfileByActiveUser(activeUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateActiveUserProfile',()=>{
    it('should update profile successfully',async()=>{
      //mock de un file
      const file: Express.Multer.File = {
        filename: 'profile-pic.jpg',
        path: '',
        mimetype: '',
        size: 0,
        buffer: Buffer.from(''),
        fieldname: '',
        originalname: '',
        encoding: '',
        stream:new Readable,
        destination: '',
      };
      //mock de usuario activo
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
      //mock del usuario
      const user:User = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        createdAt: new Date(),
        shop: [],
        cart: null,
        profile: null,
      };
      //mock de un profile
      const profile:Profile={
        profileId:1,
        profilePicture:'old-pic.jpg',
        profileName:'Test user',
        coverPhoto:'photo',
        location:'location test',
        birthDate:'date',
        user:user,
      };
      //campo a actualizar
      const UpdateProfile:UpdateProfileDto={
        location: 'new location'
      };
      //mock findOne del user para que luego de la llamada devuelba un user
      userRepositoryMock.findOne.mockResolvedValueOnce(user);

      //mock updateActiveUserProfile del ProfileService
      profileServiceMock.updateActiveUserProfile.mockResolvedValueOnce({
        ...profile,
        ...UpdateProfile,
        profilePicture:file.filename, 
      });
      const result= await service.updateActiveUserProfile(file,activeUser,UpdateProfile);
      expect(result).toEqual({
        ...profile,
        ...UpdateProfile,
        profilePicture:file.filename,
      });
      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({where:{email:activeUser.email}});
      expect(profileServiceMock.updateActiveUserProfile).toHaveBeenCalledWith(file,user,UpdateProfile);
    });

    it('should throw NotFoundException if user not found', async () => {
      const file: Express.Multer.File = {
        filename: 'profile-pic.jpg',
        path: '',
        mimetype: '',
        size: 0,
        buffer: Buffer.from(''),
        fieldname: '',
        originalname: '',
        encoding: '',
        stream: new Readable(),
        destination: '',
      };

      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };

      userRepositoryMock.findOne.mockResolvedValueOnce(null);

      await expect(service.updateActiveUserProfile(file, activeUser, {})).rejects.toThrow(NotFoundException);

      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: activeUser.email } });
    });

    it('should handle errors from profileService.updateActiveUserProfile', async () => {
      const file: Express.Multer.File = {
        filename: 'profile-pic.jpg',
        path: '',
        mimetype: '',
        size: 0,
        buffer: Buffer.from(''),
        fieldname: '',
        originalname: '',
        encoding: '',
        stream: new Readable(),
        destination: '',
      };

      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
      };

      const user: User = {
        userId: 1,
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        createdAt: new Date(),
        shop: [],
        cart: null,
        profile: null,
      };

      userRepositoryMock.findOne.mockResolvedValueOnce(user);
      //configuro al metodo updateActiveUserProfile para que lance una badGatewayExecption
      profileServiceMock.updateActiveUserProfile.mockRejectedValueOnce(new BadGatewayException('Unexpected error'));

      await expect(service.updateActiveUserProfile(file, activeUser, {})).rejects.toThrow(BadGatewayException);

      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: activeUser.email } });
      expect(profileServiceMock.updateActiveUserProfile).toHaveBeenCalledWith(file, user, {});
    });

  });//final describe
}); //final test
 
       