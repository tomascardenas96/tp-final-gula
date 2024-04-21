import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
//agrego importaciones
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { RegisterDto } from "./dto/register.dto";

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
    se lance ninguna excepción.

    Puedes simular el comportamiento 
    de UserService utilizando el mock 
    UserServiceMock que ya has definido.*/
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
        //simulamos que se encuentra un usuario con este correo electronico
        UserServiceMock.findByEmail.mockResolvedValueOnce(existingUser)

        //verify that try register the user throws a exeption
        await expect(service.register(UserRegister)).rejects.toThrowError(BadRequestException)
        //note: toThrowError aparece tachada porqeu la firma de la funcion esta obsoleta en jest
        //de igual forma cumple con su trabajo en las verciones nuevas
    });

    /*Validación de datos de entrada: Asegúrate de que la función register maneje adecuadamente 
    casos donde los datos de entrada no son válidos. Por ejemplo, podrías probar qué sucede si 
    se proporcionan datos faltantes o incorrectos en el objeto RegisterDto. */
    it('should throw BadRequestException if input data is invalid', async()=>{
        //case email missing
        const invalidDto1: RegisterDto={
            email:null,
            name: 'Test User',                          //revisar test no pasa porque perimite un email nulo.
                                                        //modificar DTO(preguntar tomy) o agregar validaciones 
                                                        //en metodo register
            password: 'password123',
            location: 'Test Location',
            birthDate: '05/10/1990',
        };
        await expect(service.register(invalidDto1)).rejects.toThrowError(BadRequestException);
        // Caso: nombre y contraseña nulos
        const invalidDto2: RegisterDto = {
            email: 'test@example.com',
            name: null,                                  //revissar lo mismo de arriba
            password: null,
            location: 'Test Location',
            birthDate: '05/10/1990',
        };
        await expect(service.register(invalidDto2)).rejects.toThrowError(BadRequestException);
    })
});

/*Validación de contraseñas: Podrías agregar pruebas para verificar que las contraseñas se estén hasheando correctamente antes de ser almacenadas en la base de datos. Esto puede incluir pruebas para garantizar que el hash de la contraseña sea único y que se genere correctamente con diferentes rondas de sal.

Pruebas de integración: Aunque no es necesario en todas las aplicaciones, podrías considerar escribir pruebas de integración que prueben la interacción entre el servicio de autenticación y el servicio de usuario (UserService). Esto podría incluir pruebas para garantizar que se llame correctamente al método findByEmail y create del servicio de usuario.

Manejo de errores: Asegúrate de que el servicio maneje correctamente cualquier error que pueda surgir durante el proceso de registro. Por ejemplo, podrías probar qué sucede si hay un error al crear un usuario en la base de datos (create del UserService falla).

Seguridad: Si tu aplicación tiene requisitos de seguridad específicos, como políticas de contraseñas, podrías agregar pruebas para verificar que se cumplan estas políticas durante el registro de un nuevo usuario.*/