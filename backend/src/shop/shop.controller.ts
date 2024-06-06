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
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ActiveUser } from '../common/decorator/active-user.decorator';
import { ActiveUserInterface } from '../common/interface/active-user.interface';
import { AuthGuard } from '../auth/guard/auth.guard';
import { extname } from 'path';

@UseGuards(AuthGuard)
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/uploads/shop/profile',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          return cb(
            null,
            `${file.originalname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  createNewShop(
    @UploadedFile() file: Express.Multer.File,
    @Body() createShopDto: CreateShopDto,
    @ActiveUser() activeUser: ActiveUserInterface,
  ) {
    return this.shopService.createNewShop(file, createShopDto, activeUser);
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
