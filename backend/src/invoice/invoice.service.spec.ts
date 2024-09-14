import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { UserService } from 'src/user/user.service';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { CartService } from 'src/cart/cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { BadGatewayException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository, UsingJoinTableIsNotAllowedError } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { Food } from 'src/food/entities/food.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';

describe('InvoiceService', () => {
  let service: InvoiceService;
  //creo instancias mockadas de los distintos servicios que interactuan
  //let invoiceServiceMock:any;
  let repository:Repository<Invoice>; //es el mock de invoice

  let FoodOnCartServiceMock: any;
  let userServiceMock:any;
  let cartServiceMock:any;

  beforeEach(async () => {
    //base de method para el mock InvoiceService
    const mockInvoiceRepository={
    find:jest.fn(),
    create:jest.fn(),
    save:jest.fn(),
   };
   //no fue necesario traerse los metodos
    //metodos mock de InvoiceService
   // invoiceServiceMock={
   //   ...baseInvoiceServiceMock,
   //   getAll:jest.fn(),
   //   generateInvoice:jest.fn(),
   //   generateInvoiceNumber:jest.fn(),
   //   generateInvoiceUser:jest.fn(),
   // };

    //mock de los metodos utilizados por FoodOncartService
    FoodOnCartServiceMock={
      getFoodsByActiveUser:jest.fn(),
    };
  //mock de los metodos utilizados por userService
    userServiceMock={
      getActiveUserByCart:jest.fn(),
      getActiveUser:jest.fn(),
    };

    cartServiceMock={
      getActiveCart:jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        UserService,
        FoodOnCartService,
        CartService,
        {provide:getRepositoryToken(Invoice),
          useValue:mockInvoiceRepository,
        },
        {
          provide:UserService,
          useValue:userServiceMock
        },
        {
          provide:FoodOnCartService,
          useValue:FoodOnCartServiceMock 
        },
        {
          provide:CartService,
          useValue:cartServiceMock
        }
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    //obtiene una instancia del repositorio mockeado que se inyecto en el modulo de pruebas (testingModule)
    repository=module.get<Repository<Invoice>>(getRepositoryToken(Invoice))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll',()=>{
    it('should return an array of invoices', async()=>{
      const result: Invoice[]=[{
        invoiceId:1,
        invoiceNumber:'C001 00000001',
        foodId:1,
        foodDescription:'Pizza',
        foodAmount:2,
        foodUnitaryPrice:10,
        emittedAt:new Date(),
        shop:null,
        cart:null,
      },        
      ];
      //configuracion de la prueba
      jest.spyOn(repository,'find').mockResolvedValue(result);
      //verificamos
      expect(await service.getAll()).toBe(result);
    });//final IT

    it('should whrow an HttpException when there is an error', async()=>{
      //configuracion del test
      jest.spyOn(repository,'find').mockRejectedValue(new Error());
      //verificamos que al llamar al metodo del servicio se arroje la exception
      try{
        await service.getAll();
      }catch (error){
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('No se pudo acceder a la información de las facturas en la base de datos');
        expect(error.getStatus()).toBe(HttpStatus.BAD_GATEWAY) 
      }
    });//final it 
  });//final describe

    describe('generateInvoice',()=>{
      it('should generate an invoice succefully when products arre found in the cart',async()=>{
        const cart:Cart= {} as Cart;//mock de cart
        const user:User={} as User;//mock de user
        const FoodOnCart: FoodOnCart[] = [
          {
            foodOnCartId: 1,//Id de la comida en el carrito 
            amount: 2,//cantidad de comidas en el carrito
            cart: cart,
            food: { //comida dentro del carrito
              foodId: 1,
              description: 'Test food',
              price: 10,
              stock: 5,
              review: 'Delicious',
              category: null,
              shop: null,
              image: null,
              cart: [],
            } as Food,
          },];
          
       
        //configuracion del test
        jest.spyOn(userServiceMock,'getActiveUserByCart').mockResolvedValue(user);
        jest.spyOn(FoodOnCartServiceMock,'getFoodsByActiveUser').mockResolvedValue(FoodOnCart);
        jest.spyOn(service,'generateInvoiceNumber').mockResolvedValue('C001 00000001');
        jest.spyOn(repository,'create').mockReturnValue({}as Invoice);
        jest.spyOn(repository,'save').mockResolvedValue({}as Invoice);

        //llamado al metodo del servicio
        const result= await service.generateInvoice(cart);
        //verificamos que se genere la factura
        expect(result).toEqual({message:'Invoice generated succesfully'});
      });//final it

      it('should throw NotFoundException when no products are found in the cart', async () => {
        const cart = {} as Cart; // Mock Cart
        const user = {} as User; // Mock User
  
        jest.spyOn(userServiceMock, 'getActiveUserByCart').mockResolvedValue(user);
        jest.spyOn(FoodOnCartServiceMock, 'getFoodsByActiveUser').mockResolvedValue([]);
        jest.spyOn(service, 'generateInvoiceNumber').mockResolvedValue('C001 00000001');
  
        await expect(service.generateInvoice(cart)).rejects.toThrowError(
          new NotFoundException('No se encontraron productos en el carrito')
        );
      });//final it

      it('should throw HttpException when an unexpected error occurs', async()=>{
        const cart= {}as Cart;
        const user= {}as User;

        //configuracion del test
        jest.spyOn(userServiceMock,'getActiveUserByCart').mockResolvedValue(user);
        jest.spyOn(FoodOnCartServiceMock,'getFoodsByActiveUser').mockRejectedValue(new Error('Unexpected error'));

        //llamado al metodo del servicio
        await expect(service.generateInvoice(cart)).rejects.toThrowError(
          new HttpException('Error al generar la factura', HttpStatus.INTERNAL_SERVER_ERROR)); 
      });//final it
    });//final describe

    describe('generateInvoiceNumber', () => {
      it('should generate a correctly formatted invoice number when there are existing invoices', async () => {
        // Datos de prueba
        const invoices = [
          { invoiceNumber: 'C001 00000001' },
          { invoiceNumber: 'C001 00000005' },
        ];
        //configuracion del test
        //mock de `getAll` para devolver las facturas existentes
        jest.spyOn(service, 'getAll').mockResolvedValue(invoices as Invoice[]);
    
        //Resultado esperado
        const expectedInvoiceNumber = 'C001 00000006';
    
        //Llamada al método del servicio y verificación
        const result = await service.generateInvoiceNumber();
        expect(result).toBe(expectedInvoiceNumber);
      });//final IT

      it('should generate the first invoice number when there are no existing invoices', async () => {
        //configuracion del test
        //mock de `getAll` para devolver un array vacío
        jest.spyOn(service, 'getAll').mockResolvedValue([] as Invoice[]);
    
        //resultado esperado
        const expectedInvoiceNumber = 'C001 00000001';
    
        //Llamada al método y verificación
        const result = await service.generateInvoiceNumber();
        expect(result).toBe(expectedInvoiceNumber);
      });
      
      it('should throw an HttpException when there is an error fetching invoices', async () => {
        // Mock de `getAll` para lanzar un error
        jest.spyOn(service, 'getAll').mockRejectedValue(new Error('Database Error'));
    
        // Verificación de excepción
        await expect(service.generateInvoiceNumber()).rejects.toThrow(HttpException);
        await expect(service.generateInvoiceNumber()).rejects.toThrow('Error al generar el numero de factura');
      });
    });//final describe

    describe('getInvoicesByActiveUser',()=>{
      it('should retunr an array of invoices by activeUser',async ()=>{
        //mock necesarios
        const activeUser:ActiveUserInterface={ 
          userId:1,
          name:'testUser',
          email:'test@example.com'};

        const user:User={
          userId:activeUser.userId,
          email:activeUser.email,
          name:activeUser.name
        } as User
       
        const cart: Cart={
          cartId:1,
          user:user,
          food:[],
          invoice:[]
        };

        const invoices: Invoice[]=[{invoiceId:1,cart}] as Invoice[];

        //configuracion del test
        jest.spyOn(userServiceMock,'getActiveUser').mockResolvedValue(user);
        jest.spyOn(cartServiceMock,'getActiveCart').mockResolvedValue(cart);
        jest.spyOn(repository,'find').mockResolvedValue(invoices);

        //llamado al metodo del servicio
        const result= await service.getInvoicesByActiveUser(activeUser);
        expect(result).toBe(invoices);
      });//final it

    it('should throw BadGatewayException if there is an error', async () => {
      const activeUser: ActiveUserInterface = {
         userId: 1, 
         name:'testUser',
         email:'test@example.com' };

      jest.spyOn(userServiceMock, 'getActiveUser').mockRejectedValue(new Error());

      await expect(service.getInvoicesByActiveUser(activeUser)).rejects.toThrow(
      BadGatewayException,)
    });//final IT
    });//final describe
});//final
