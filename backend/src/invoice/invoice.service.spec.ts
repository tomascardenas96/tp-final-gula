import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { UserService } from 'src/user/user.service';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import exp from 'constants';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('InvoiceService', () => {
  let service: InvoiceService;
  //creo instancias mockadas de los distintos servicios que interactuan
  let invoiceServiceMock:any;
  let FoodOnCartServiceMock: any;
  let userServiceMock:any;

  beforeEach(async () => {
    //base de method para el mock InvoiceService
    const baseInvoiceServiceMock={
      find:jest.fn(),
      create:jest.fn(),
      save:jest.fn(),
    };
    //metodos mock de InvoiceService
    invoiceServiceMock={
      ...baseInvoiceServiceMock,
      getAll:jest.fn(),
      generateInvoice:jest.fn(),
      generateInvoiceNumber:jest.fn(),
      generateInvoiceUser:jest.fn(),
    };

    //mock de los metodos utilizados por FoodOncartService
    FoodOnCartServiceMock={
      getFoodByActiveCart:jest.fn(),
    };
  //mock de los metodos utilizados por userService
    userServiceMock={
      getActiveUserByCart:jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        UserService,
        FoodOnCartService,
        {provide:getRepositoryToken(Invoice),
          useValue:invoiceServiceMock,
        },
        {
          provide:UserService,
          useValue:userServiceMock
        },
        {
          provide:FoodOnCartService,
          useValue:FoodOnCartServiceMock 
        }
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll',()=>{
    it('should return an array of invoices', async()=>{
      const result: Invoice[]=[{
        invoiceId:1,
        invoiceNumber:'c001 00000001',
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
      jest.spyOn(invoiceServiceMock,'find').mockResolvedValue(result);
      //verificamos
      expect(await service.getAll()).toBe(result);
    });//final IT

    it('should whrow an HttpException when there is an error', async()=>{
      //configuracion del test
      jest.spyOn(invoiceServiceMock,'find').mockRejectedValue(new Error());
      //verificamos que al llamar al metodo del servicio se arroje la exception
      try{
        await service.getAll();
      }catch (error){
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('No se puede acceder a la data');
        expect(error.getStatus()).toBe(HttpStatus.BAD_GATEWAY) 
      }

    });//final it 
  });//final describe
});//final
