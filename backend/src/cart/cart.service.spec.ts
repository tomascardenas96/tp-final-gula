import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
//agrego importaciones
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { BadGatewayException, NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let cartServiceMock:any;

  const baseCartServiceMock={
    create:jest.fn(),
    save:jest.fn(),
    findOne:jest.fn(),
    delete:jest.fn(),
  };

  cartServiceMock={
    ...baseCartServiceMock,
    create:jest.fn(),
    getActiveCart:jest.fn(),
    clearCart:jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService,
        {
          provide:getRepositoryToken(Cart),
          useValue:cartServiceMock,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create',()=>{
    it('should create and save a new cart',async ()=>{
      //mock del resultado esperado
      const cart= new Cart;

      //configuracion del test
      //al llmar al metodo create debe retonar un carrito
      jest.spyOn(cartServiceMock,'create').mockReturnValue(cart);
      //al llamar al metodo save debe resolver guardando un carrito
      jest.spyOn(cartServiceMock,'save').mockResolvedValue(cart);

      //lamado al servicio
      const result= await service.create()

      //verifico que el metodo create sea llamado
      expect(cartServiceMock.create).toHaveBeenCalled();
      //verifico save sea llamado con un cart y  que el resultado obtenido es el querido
      expect(cartServiceMock.save).toHaveBeenCalledWith(cart);
      expect(result).toBe(cart);
    });//final it
  });//final describe

  describe('getActiveCart',()=>{
    it('should return the active cart for a give user',async ()=>{
      //mock de los objetos a utilizar
      const user= new User();//genero un usuario
      user.cart={cartId:1} as Cart;//asigno un carrito al usuario

      const cart= new Cart();

      //configuracion del test:
      //cuando se llame al metodo findOne debe resolver con un cart
      jest.spyOn(cartServiceMock,'findOne').mockResolvedValue(cart);

      //llamado al servicio
       const result= await service.getActiveCart(user);

      //verifico que el metodo findOne sea llamado con los parametros correctos
      expect(cartServiceMock.findOne).toHaveBeenCalledWith({
        where:{ cartId:user.cart.cartId}
      });
      //verifico que el resultado es el esperado
      expect(result).toBe(cart);

    });//final it

    it('should throw NotFoundException if cart is not found', async () => {
      const user = new User();//mock de un usuario
      user.cart = { cartId: 1 } as Cart; //asignamos un carrito al usuario

      //configuracion del test:
      //al llamar al metodo findOne implementamos un metodo para simular un error
      jest.spyOn(cartServiceMock, 'findOne').mockImplementation(()=>{
        throw new NotFoundException('Cart service: cart not found - getActiveCart method')
      });

      await expect(service.getActiveCart(user)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadGatewayException on other errors', async () => {
      //mockd de los parametros a utilizar
      const user = new User();
      user.cart = { cartId: 1 } as Cart;
      //configuracion del test: simulamos un error inesperado al utilizar findOne
      jest.spyOn(cartServiceMock, 'findOne').mockImplementation(() => {
        throw new Error('Unexpected error');
      });
      //llamado al metodo del servicio esperando que se lanze una exception BadGateway
      await expect(service.getActiveCart(user)).rejects.toThrow(BadGatewayException); 
    });
  });//final describe

  describe('clearCart',()=>{
    it('should delete all items in the cart', async ()=>{
      //configuracion del test
      //cuando se llame al metodo delete se debe resolver con un objeto vacio
      jest.spyOn(cartServiceMock,'delete').mockResolvedValue({} as any);

      //llamado al servicio
      await service.clearCart();

      //verificamos que el metodo delete sea llamado con un objeto vacio para eliminar los items
      expect(cartServiceMock.delete).toHaveBeenCalledWith({});
    });
  });
});
