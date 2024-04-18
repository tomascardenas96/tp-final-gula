import { Test,TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
//agrego importaciones
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./guard/auth.guard";

describe('AuthController',()=>{
    let controller: AuthController;
    
    beforeEach(async()=> {
        const authServicemock={};//crea un mock vacio para AuthService
        const jwtServiceMock={};//crea un mock vacio para JwtService
        const authGuardMock={};//crea un mock vacio para AuthGuard

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

        controller=module.get<AuthController>(AuthController);
       
    });

    it('should be defined', ()=> {
        expect(controller).toBeDefined();
    });
});