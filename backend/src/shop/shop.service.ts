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
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    private readonly userService: UserService,
  ) {}

  create(createShopDto: CreateShopDto) {
    return 'This action adds a new shop';
  }

  getAllShops() {
    try {
      return this.shopRepository.find();
    } catch (err) {
      throw new BadGatewayException({ errorMessage: 'database error' });
    }//modifique el mensaje de error que lanzaba.
  }

  getShopByName(name: string) {
    return this.shopRepository.findOneBy({ name });
  }

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
