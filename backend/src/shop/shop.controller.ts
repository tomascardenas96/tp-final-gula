import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ActiveUser } from '../common/decorator/active-user.decorator';
import { ActiveUserInterface } from '../common/interface/active-user.interface';
import { AuthGuard } from '../auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @Get()
  getAllShops() {
    return this.shopService.getAllShops();
  }

  @Get('active-user')
  getShopsByActiveUser(@ActiveUser() user: ActiveUserInterface) {
    return this.shopService.getShopsByActiveUser(user);
  }

  @Get('filter')
  findShopByQuery(@Query('shop') shop: string) {
    return this.shopService.findShopByQuery(shop);
  }
}
