import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) {}

  create(createShopDto: CreateShopDto) {
    return 'This action adds a new shop';
  }

  findShopByQuery(shop: string) {
    try {
      return this.shopRepository.find({ where: { name: ILike(`%${shop}%`) } });
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
