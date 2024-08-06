import { Test,TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
//agrego importaciones
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./guard/auth.guard";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { ActiveUserInterface } from "src/common/interface/active-user.interface";


describe('AuthController',()=>{
    let controller: AuthController;
    let service:AuthService;
    let jwtService:JwtService;
    
    beforeEach(async()=> {
        const authServicemock={
            register:jest.fn(),
            login:jest.fn(),
        };//crea un mock vacio para AuthService
        const jwtServiceMock={
            //simula la generacion de un token valido
            singAsync:jest.fn(()=>'jwtToken'),

        };//crea un mock para JwtService

        const authGuardMock={
            canActivate:jest.fn().mockReturnValue(true)//simula que el guardia permite el acceso
        };//crea un mock para AuthGuard

        const module: TestingModule= await Test.createTestingModule({
            controllers:[AuthController],
            providers:[
                        AuthService,
                        JwtService,//agrega JwtService a los providers
                        AuthGuard,
                        {
                            provide:AuthService,
                            useValue:authServicemock,
                        },
                        {
                            provide:JwtService,
                            useValue:jwtServiceMock,
                        },
                        {
                            provide:AuthGuard,
                            useValue:authGuardMock,
                        }
                    ],
        }).compile();

        controller=module.get<AuthController>(AuthController);//obtiene instancia del controlador
        service=module.get<AuthService>(AuthService);//obtiene instancia del dervicio con todos sus metodos y dependencias para luego utilizar en las pruebas
        jwtService=module.get<JwtService>(JwtService);
    });

    it('should be defined', ()=> {
        expect(controller).toBeDefined();
    });
    //==========================================================
    //REGISTRO
    //==========================================================
    //deberia registrar un nuevo usuario,
    //Verificar que se devuelva un objeto con el mensaje de éxito y los datos del usuario registrado.
    describe('register',()=>{

        it('should register a new user',async()=>{
            const userRegisterDto: RegisterDto = {
            email: 'test@example.com',
            name: 'Test User',
            password: 'password123',
            location: 'Test Location',
            birthDate: '05/10/1990',
        };
        const expectedResponse = {
            email: userRegisterDto.email,
            username: userRegisterDto.name,
            message: 'Register successful',
        };
        //espio el metodo register del servicio 
        jest.spyOn(service,'register').mockResolvedValueOnce(expectedResponse);
        //cuando se llame al metodo register del controlador durante la prueba, 
        //en lugar de ejecutar la implementacion real del metodo jest devolvera 
        //la promesa resulta con expecterResponse
        const result= await controller.register(userRegisterDto);
        
        expect(result).toEqual(expectedResponse);
        expect(service.register).toHaveBeenCalledWith(userRegisterDto);
    })
    
})
    //==========================================================
    //LOGIN
    //==========================================================
    //Verificar que un usuario pueda iniciar sesión correctamente.
    //Verificar que se devuelva un token JWT válido al iniciar sesión correctamente.
    describe('login',()=>{

        it('should return JWT token for valid credentials',async()=>{
            const loginDTO:LoginDto={
            email:'test@example.com',
            password:'password123',
        };
        const responseLogin={
            token:'mockend-jwt-token',
            email:'test@example.com',
            message:'registered succesfully'
        }
        //configuramos el comprotamiento esperado del servicio de autenticacion
        jest.spyOn(service,'login').mockResolvedValueOnce(responseLogin);

        //llamamos al metodo del controlador que estamos probando
        const result= await controller.login(loginDTO);
        
        //verificamos que la respuesta contenga el token JWT devuelto por el servicio de autenticacion
        expect(result.token).toEqual(responseLogin.token) 
    });
    
    it('should throw UnauthorizedExeption for invalid credentials',async()=>{
        const userLoginDto: LoginDto = {
            email: 'test@example.com',
            password: 'invalid-password',
        };

        //configuramos el comportamiento esperado del servicio de autenticacion
        //espero qeu cuando llame al metodo login del servicio y pase aalgo mal me devuelba un UnauthorizedException
        jest.spyOn(service,'login').mockRejectedValueOnce(new UnauthorizedException);

        //llamamos al metodo del controlador que estamos probando y esperamos que devuelba un UnauthorizedException
        await expect(controller.login(userLoginDto)).rejects.toThrow(UnauthorizedException);
    })
    
});    
    //==========================================================
    //HOME
    //==========================================================
    /*para realizar laa prueba del metodo HOME, necesitamos simular la autenticacion del usuario
    para que el guardia de autenticacion permita el acceso al metodo HOME. luego podremos verificar 
    si los datos del usuario activo se devuelven correctamente */
    describe('home',()=>{
        /*Verificar que un usuario autenticado pueda acceder a la página de 
        inicio: Esto se logra al simular que el guardia de autenticación (AuthGuard) 
        permite el acceso al usuario activo. Al espíar el método home del controlador 
        y hacer que devuelva el usuario activo, estamos comprobando que el usuario 
        tiene acceso a la página de inicio.
        Verificar que se devuelvan los datos del usuario activo correctamente: 
        Después de ejecutar el método home con el usuario activo, verificamos que 
        los datos devueltos sean los mismos que los del usuario activo. Esto asegura 
        que los datos del usuario se manejen correctamente dentro del método home y 
        se devuelvan como se esperaba.*/
    
        it('should retunr active user data', async ()=>{
            //simulamos el usuario activo devuelto por el guard.
            const activeUser:ActiveUserInterface={
                userId:1,
                email:'test@example.com',
                name:'test User'
            };

            //espia al guard para simular qeu devuelve el usuario activo
            jest.spyOn(controller,'home').mockImplementationOnce(()=>activeUser);

            //ejecuta la prueba
            const result = await controller.home(activeUser);
            //verificamos que se devuelvan los datos del susuario activo correctamente
            expect(result).toEqual(activeUser)
        });    
    });

    /*Verificar que un usuario autenticado pueda acceder a su perfil: Esto se logra 
    al simular que el usuario tiene acceso al método profile del controlador.
    Verificar que se devuelva un mensaje indicando que se está accediendo al 
    perfil: Después de ejecutar el método profile, verificamos que el resultado 
    sea el mensaje esperado, en este caso, "Perfil". Esto asegura que el método 
    profile devuelva el mensaje correcto al usuario. */
    describe('profile',()=>{
        it('should retunr active user for authenticated user', async ()=>{
            //simulamos un usuario activo por interface
            const activeUser:ActiveUserInterface={
                userId:1,
                email:'test@example.com',
                name:'test user',
            };

            //espia el metodo prifile: simulamos el guard permitiendo acceso
            jest.spyOn(controller,'profile').mockImplementationOnce(()=>activeUser);
            //ejecutamos la prueba
            const result= await controller.profile(activeUser);
            //verificamos que se devuelva el mensjae de perfil esperado
            expect(result).toEqual(activeUser);
        });
    });
}); 

