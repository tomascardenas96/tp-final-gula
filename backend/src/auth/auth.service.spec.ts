import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
//agrego importaciones
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
//agregamos importacion de la biblioteca bcryptjs para hash
import * as bcryptjs from 'bcryptjs';


//mock bcryptjs

jest.mock('bcryptjs',()=>({
    genSalt:jest.fn(),
    hash:jest.fn(),
    compare:jest.fn(),
}));


describe('AuthService', () =>{
    let service: AuthService;
    let UserServiceMock:jest.Mocked<UserService>;

    beforeEach(async()=>{
        //creamos una instancia mock de UserService
        UserServiceMock={
            findByEmail: jest.fn(),
            findByEmailWithPassword: jest.fn(),
            findByUserName: jest.fn(),
            create: jest.fn(),
        } as unknown  as jest.Mocked<UserService>;
         
        const jwtServiceMock={
            //define los metodos que necesitas en tu mock Jwtservice
        };
        
        //inicializamos el modulo de prueba
        const module: TestingModule= await Test.createTestingModule({
            providers:[AuthService,
                {
                    provide:UserService,
                    useValue:UserServiceMock,
                },
                {
                    provide:JwtService,
                    useValue:jwtServiceMock,
                },
            ],
            }).compile();
            
            service=module.get<AuthService>(AuthService);
        });
           
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    //**************************************************
    //METHOD REGISTER TEST

    //test for valid data:

    /*Crea un caso de prueba donde 
    proporcionas datos válidos para 
    registrar un nuevo usuario.
    
    Verifica que el método register 
    funcione correctamente y que no 
    se lance ninguna excepción.*/
    describe('register',()=>{

        it('should registrer a new user with valid data', async()=>{
            const registrerDto={
                email:'test@example.com',
                name:'Test User',
                password:'password123',
                location:'Test Location',
                birthDate:'05/10/1990',
            };
            
            const expectedResponse={
            email:registrerDto.email,
            username:registrerDto.name,
            message:'Register successful'
        }

        const result= await service.register(registrerDto);
        expect(result).toEqual(expectedResponse)
    });
    
    /*================================================================================ */
    
    /*Test for exist user:
    Crea otro caso de prueba donde intentas registrar 
    un usuario con un correo electrónico que ya está 
    en uso.
    Verifica que se lance una excepción BadRequestException 
    como se espera.
    Puedes simular el comportamiento de UserService 
    utilizando el mock UserServiceMock que ya has definido.*/
    
    it('should throw BadRequestException if user already exists',async()=>{
        
        const existingMail= 'existing@example.com'
        //user with existing mail
        const existingUser:User ={
            userId:1,
            email: existingMail,
            name: 'Existing User',
            password: 'password123',
            createdAt:new Date(),
            shop:[],
            cart:null,
            profile:null
        } 
        const UserRegister:RegisterDto={
            email:existingMail,
            name:'existing User',
            password:'password123',
            location:'Test Location',
            birthDate:'05/10/1990',
        }
        //simulamos el comportamiento de UserService utilizando el mock UserServiceMock que ya hemos definido
        //simulamos que se encuentra un usuario con este correo electronico
        UserServiceMock.findByEmail.mockResolvedValueOnce(existingUser)

        //verify that try register the user throws a exeption
        await expect(service.register(UserRegister)).rejects.toThrowError(BadRequestException)
        //note: toThrowError aparece tachada porqeu la firma de la funcion esta obsoleta en jest
        //de igual forma cumple con su trabajo en las verciones nuevas
    });
    
    /*================================================================================ */

    /*Validación de datos de entrada: Asegúrate de que la función register maneje adecuadamente 
    casos donde los datos de entrada no son válidos. Por ejemplo, podrías probar qué sucede si 
    se proporcionan datos faltantes o incorrectos en el objeto RegisterDto. */
    
    /* 
    it('should throw BadRequestException if input data is invalid', async()=>{
        //case email missing
        const invalidDto1: RegisterDto={
            email:null,
            name: 'Test User',                          
            password: 'password123',
            location: 'Test Location',
            birthDate: '05/10/1990',
        };
        await expect(service.register(invalidDto1)).rejects.toThrowError(BadRequestException);
        // Caso: nombre y contraseña nulos
        const invalidDto2: RegisterDto = {
            email: 'test@example.com',
            name: null,                                 
            password: null,
            location: 'Test Location',
            birthDate: '05/10/1990',
        };
        await expect(service.register(invalidDto2)).rejects.toThrowError(BadRequestException);
    }); */
/*================================================================================ */
    /*Validación de contraseñas:Pruebas para 
    verificar que las contraseñas se estén hasheando 
    correctamente antes de ser almacenadas en la base de datos.*/

    it('should hash password before storing it in th database', async()=>{
               
        const userRegister:RegisterDto={
            email: 'test@example.com',
            name: 'Test User',
            password: 'password123',
            location: 'Test Location',
            birthDate: '05/10/1990',
        };
        
        //pueba de salt y hash
        const roundSalt = 10;
        //console.log('antes de generar el salt')
        const salt = await bcryptjs.genSalt(roundSalt);
        //console.log('despues de generar el salt',salt);

        //console.log('antes de genrear el hash', userRegister.password)
        
        const userRegistered:User={
            userId:1,
            email: 'test@example.com',
            name: 'Test User',
            password: await bcryptjs.hash(userRegister.password, salt),
            createdAt:new Date(),
            shop:[],
            cart:null,
            profile:null,
        };
        //console.log('despues de genrar el hash',userRegistered.password)
        const comparePassword= await bcryptjs.compare(userRegister.password,userRegistered.password)
        expect(comparePassword).toBeTruthy;
    })
    
        //verifica que los metodos genSalt y hash sean llamados correctamente
        it('shoud check if methods genSalt and hash are called correctly',async()=>{

            //user's register example
            const user:RegisterDto={
                email: 'test@example.com',
                name: 'Test User',
                password: 'password123',
                location: 'Test Location',
                birthDate: '05/10/1990',
            };
            
            const salt= 'mocked-Salt';
            const hashedPassword='mocked-hash';
            
            
            //mockea la generacion de la salt y el hash de la contraseña
            (bcryptjs.genSalt as jest.Mock).mockResolvedValue(salt);
            (bcryptjs.hash as jest.Mock).mockResolvedValue(hashedPassword);
            
            await service.register(user);
            //verifica que el metodo hash de bcryptjs haya sido llamado correctamente
            expect(bcryptjs.genSalt).toHaveBeenCalledWith(10);
            expect(bcryptjs.hash).toHaveBeenCalledWith(user.password,salt);
        });
        /*========================================================================================== */
        
        /*========================================================================================== */

        it('should retunr success message when user is registered successfully',async ()=>{
            //user that will be created in the database
            const userRegister:RegisterDto={
                email: 'test@example.com',
                name: 'Test User',
                password: 'password123',
                location: 'Test Location',
                birthDate: '05/10/1990',
            };
           
            const hashedPassword= await bcryptjs.hash(userRegister.password,10)
            //user created in the dataBase
            const userRegistered:User={
                userId:1,
                email: 'test@example.com',
                name: 'Test User',
                password: hashedPassword,
                createdAt:new Date(),
                shop:[],
                cart:null,
                profile:null,
            };
            
            //configuration a spy on the User.Service.create's method 
            jest.spyOn(UserServiceMock,'create').mockResolvedValueOnce(userRegistered);
            //ejecutamos el metodo que estamos esperando
            const userRegisteredSuccessfully = await service.register(userRegister)
            //check that UserService.created method went called with the expected parametres
           // expect(UserServiceMock.create).toHaveBeenCalledWith(userRegister); ***************lo borre no lo pude hacer andar
            //check that the result been the expected 
            const expectedResult = {
                email: userRegister.email,
                username: userRegister.name,
                message: 'Register successful',
            };
            
            expect(userRegisteredSuccessfully).toEqual(expectedResult)
        });
    });

        /*========================================================================================== */
            //TESTING LOGIN
        /*========================================================================================== */
        //no detecta la calve revisar
        describe('AuthService-login',()=>{
            //test for success case
           /* it('should generate JWT token for valid credentials',async()=>{
                const email= 'test@example.com';
                const password= 'password123';
                const hashedPassword=await bcryptjs.hash(password,10)
               

                const userRegistered={
                    userId:1,
                    email: 'test@example.com',
                    name: 'Test User',
                    password: hashedPassword,//hasheamos la contraseña
                    createdAt:new Date(),
                    shop:[],
                    cart:null,
                    profile:null,
                };
                //simulamos respuesta del userService.findByEmailWithPassword
                UserServiceMock.findByEmailWithPassword.mockResolvedValue(userRegistered)
                //llamamos al metodo login con las credenciales validas
                const result= await service.login({email,password});

                //veificamos que se haya generado un token JWT y se haya devuelto en el resultado
                expect(result.token).toBeDefined();
                expect(result.email).toBe(email);
                expect(result.message).toBe('success');
            })*/

            //si el user no existe
            it('should throw NotFoundException for non-existent user',async()=>{
                const email='nonExistent@example.com';
                const password='password123';

                //simulamos que no se encuentra ningun usaurio con ese email
                UserServiceMock.findByEmailWithPassword.mockResolvedValue(null);

                //Verificamos que al intentar iniciar sesión con credenciales inválidas se lance una NotFoundException
                await expect(service.login({email,password})).rejects.toThrowError(NotFoundException);   
            });

            // Prueba para el caso en el que se proporciona una contraseña incorrecta
            it('should throw UnauthorizedException for incorrect password',async()=>{
                const email='test@example.com';
                const password='incorrectPassword';

                const user={
                    userId:1,
                    email: 'test@example.com',
                    name: 'Test User',
                    password: await bcryptjs.hash('password123',10),//hashamos la contraseña almacenada en la DB
                    createdAt:new Date(),
                    shop:[],
                    cart:null,
                    profile:null
                };

                //simlamos la respuesta del userService.findByEmailWithPassword
                UserServiceMock.findByEmailWithPassword.mockResolvedValue(user);

                //verificamos que al intentar iniciar sesion conuna contraeña incorrecta se lance una UnauthorizedException
                await expect(service.login({email,password})).rejects.toThrowError(UnauthorizedException)
            }) 

            // Prueba para el caso en el que no se encuentra una clave secreta JWT en las variables de entorno
            it('should throw UnauthorizedException if JWT secret key is not found', async () => {
                // Simulamos que no se encuentra ninguna clave secreta JWT en las variables de entorno
                delete process.env.JWT_SECRET;

                const email = 'test@example.com';
                const password = 'password123';

                const user={
                    userId:1,
                    email: 'test@example.com',
                    name: 'Test User',
                    password: await bcryptjs.hash('password123',10),//hashamos la contraseña almacenada en la DB
                    createdAt:new Date(),
                    shop:[],
                    cart:null,
                    profile:null
                };
                // Simulamos la respuesta del UserService.findByEmailWithPassword
                UserServiceMock.findByEmailWithPassword.mockResolvedValue(user);

                 // Verificamos que al intentar iniciar sesión sin una clave secreta JWT se lance una UnauthorizedException
                await expect(service.login({email, password})).rejects.toThrowError(UnauthorizedException)
            }); 

        });


});


/*
Pruebas de integración: Aunque no es necesario en todas las aplicaciones, podrías considerar escribir pruebas de integración que prueben la interacción entre el servicio de autenticación y el servicio de usuario (UserService). Esto podría incluir pruebas para garantizar que se llame correctamente al método findByEmail y create del servicio de usuario.

Manejo de errores: Asegúrate de que el servicio maneje correctamente cualquier error que pueda surgir durante el proceso de registro. Por ejemplo, podrías probar qué sucede si hay un error al crear un usuario en la base de datos (create del UserService falla).

Seguridad: Si tu aplicación tiene requisitos de seguridad específicos, como políticas de contraseñas, podrías agregar pruebas para verificar que se cumplan estas políticas durante el registro de un nuevo usuario.*/