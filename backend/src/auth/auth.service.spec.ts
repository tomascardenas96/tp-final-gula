import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
//agrego importaciones
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";

describe('AuthService', () =>{
    let service: AuthService;

    beforeEach(async()=>{
        const UserServiceMock={
            findByEmail:jest.fn(),
            findByEmailWithPassword:jest.fn(),
        };

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
});