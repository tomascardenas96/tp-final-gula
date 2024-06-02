import {
  Injectable,
  ForbiddenException,
  BadGatewayException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ILike, Repository } from 'typeorm';
import { ActiveUserInterface } from '../common/interface/active-user.interface';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    private readonly userService: UserService,
  ) {}



  async create(shop: CreateShopDto,activeUser:ActiveUserInterface):Promise<Shop> {
    //se crea una nueva tienda
    
    const user:User = await this.userService.findByEmail(activeUser.email);
    const newShop:Shop= this.shopRepository.create({
      name:shop.name,
      location:shop.location,
      phone:shop.phone,
      profilename:shop.profilename,
      picture:shop.picture,
      user:user
    })
    return this.shopRepository.save(newShop);
  };

  getAllShops() {
    try {
      return this.shopRepository.find();
    } catch (err) {
    }
      throw new BadGatewayException({ errorMessage: 'database error' });//indica que el servidor recibió una respuesta inválida del servidor ascendente mientras intentaba cumplir la solicitud del cliente.
    }//modifique el mensaje de error que lanzaba.

  async getShopByName(name: string):Promise<Shop> {
    return await this.shopRepository.findOneBy({ name });
  }//tomy modifique esto. agrege que tiene qeu devolver una proesa y agrege el async await

  async getShopsByActiveUser(user: ActiveUserInterface) {
    try {
      const activeUser = await this.userService.findByEmail(user.email);
      return this.shopRepository.find({ where: { user: activeUser } });
    } catch (err) {
      throw new BadGatewayException({ errorMessage: err });
    }
  }

  findShopByQuery(shop: string) {
    try {
      return this.shopRepository.find({
        where: { name: ILike(`%${shop}%`) },
      });
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
