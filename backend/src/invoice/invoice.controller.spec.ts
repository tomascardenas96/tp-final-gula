import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { UserService } from 'src/user/user.service';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { CartService } from 'src/cart/cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/entities/food.entity';
import { GulaSocketGateway } from 'src/socket/socket.gateway';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { ShopService } from 'src/shop/shop.service';
import { Shop } from 'src/shop/entities/shop.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { BadGatewayException } from '@nestjs/common';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let service:InvoiceService;
  let userService:UserService;
  let cartService:CartService;
  let inoviceRepository:Repository<Invoice>;

  beforeEach(async () => {


    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        InvoiceService,
        UserService,
        FoodOnCartService,
        FoodService,
        CartService,
        ProfileService,
        GulaSocketGateway,
        CategoryService,
        ShopService,
        JwtService,
        {
          provide:getRepositoryToken(Invoice),//obtenemos el token del repositorio
          useClass:Repository//simula un repositorio
        },
        {
          provide:getRepositoryToken(User),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(FoodOnCart),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Food),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Cart),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Profile),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Category),
          useClass:Repository
        },
        {
          provide:getRepositoryToken(Shop),
          useClass:Repository
        }
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    service = module.get<InvoiceService>(InvoiceService);
    userService = module.get<UserService>(UserService); // Obtener el servicio de usuarios
    cartService = module.get<CartService>(CartService); // Obtener el servicio de carritos
    inoviceRepository = module.get<Repository<Invoice>>(getRepositoryToken(Invoice)); // Obtener el repositorio de invoices
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInvoicesByActiveUser',()=>{
    it('should return invoices for the active user',async ()=>{
     
      //mock activeUser
      const activeUser:ActiveUserInterface={
        userId:1,
        email:'test@example.com',
        name:'testUser'
      };
      //mock cart
      const cart={cartId:1} as Cart;
      //mock User Activo
      const UserActivo={userId:activeUser.userId}as User;
      //mock invoice
      const mockInvoice=[{invoiceNumber:'C001 00000001'}]as Invoice[];

      jest.spyOn(userService,'getActiveUser').mockResolvedValue(UserActivo);
      jest.spyOn(cartService,'getActiveCart').mockResolvedValue(cart);
      jest.spyOn(inoviceRepository,'find').mockResolvedValue(mockInvoice);

      const result= await controller.getInvoicesByActiveUser(activeUser);

      expect(result).toEqual(mockInvoice); 
      
    });//final it

    it('should call service.getInvoicesByActiveUser with the correct parameters', async () => {
      // Mock del usuario activo
      const activeUser: ActiveUserInterface = {
        userId: 1,
        email: 'test@example.com',
        name: 'testUser',
      };

      // Mock del retorno del servicio
      const mockInvoice = [{ invoiceNumber: 'C001 00000001' }] as Invoice[];

      // Espiar el método `getInvoicesByActiveUser` del servicio
      const serviceSpy = jest
        .spyOn(service, 'getInvoicesByActiveUser')
        .mockResolvedValue(mockInvoice);

      // Llamar al método del controlador
      const result = await controller.getInvoicesByActiveUser(activeUser);

      // Verificar que el método del servicio fue llamado con los parámetros correctos
      expect(serviceSpy).toHaveBeenCalledWith(activeUser);

      // Verificar que el resultado del controlador sea el esperado
      expect(result).toEqual(mockInvoice);
    });

    it('should throw a BadGatewayException if there is an error', async () => {
      //mock activeUser
      const activeUser:ActiveUserInterface={
        userId:1,
        email:'test@example.com',
        name:'testUser'
      };
      
      jest.spyOn(userService, 'getActiveUser').mockRejectedValue(new Error('Error'));
  
      await expect(controller.getInvoicesByActiveUser(activeUser))
        .rejects
        .toThrow(BadGatewayException);
    });
  });//final describe
});
