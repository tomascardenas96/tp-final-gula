import {
  Injectable,
  ForbiddenException,
  BadGatewayException,
  NotFoundException,
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

  async createNewShop(
    file: Express.Multer.File,
    createShopDto: CreateShopDto,
    activeUser: ActiveUserInterface,
  ): Promise<Shop> {
    try {
      const user: User = await this.userService.getActiveUser(activeUser);

      if (!user) {
        throw new NotFoundException(
          'Shop service: user not found - createNewShop method',
        );
      }

      const newShop: Shop = this.shopRepository.create({
        ...createShopDto,
        picture: file?.filename,
        user,
      });

      return this.shopRepository.save(newShop);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException(
        'Shop service: error trying to create new shop - createNewShop method',
      );
    }
  }

  getAllShops(): Promise<Shop[]> {
    try {
      return this.shopRepository.find();
    } catch (err) {
      throw new BadGatewayException({ errorMessage: err });
    }
  }

  getShopByName(name: string): Promise<Shop> {
    return this.shopRepository.findOneBy({ name });
  }

  getShopByProfileName(profilename: string): Promise<Shop> {
    try {
      return this.shopRepository.findOne({
        where: { profilename },
      });
    } catch (err) {
      throw new BadGatewayException(
        'Shop service: error getting shop by profile name - getShopByProfileName method ',
      );
    }
  }

  async getShopsByActiveUser(user: ActiveUserInterface): Promise<Shop[]> {
    try {
      const activeUser = await this.userService.findByEmail(user.email);
      return this.shopRepository.find({ where: { user: activeUser } });
    } catch (err) {
      throw new BadGatewayException({ errorMessage: err });
    }
  }

  findShopByQuery(shop: string): Promise<Shop[]> {
    try {
      return this.shopRepository.find({
        where: { name: ILike(`%${shop}%`) },
      });
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
