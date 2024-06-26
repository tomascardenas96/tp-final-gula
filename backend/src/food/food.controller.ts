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
  UploadedFile,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(AuthGuard)
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post('/:shopProfile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/uploads/shop/food',
        filename(req, file, callback) {
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          return callback(
            null,
            `${file.originalname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  createNewFood(
    @UploadedFile() file: Express.Multer.File,
    @Body() newFood: CreateFoodDto,
    @ActiveUser() activeUser: ActiveUserInterface,
    @Param('shopProfile') shopProfile: string,
  ) {
    return this.foodService.createNewFood(
      file,
      shopProfile,
      newFood,
      activeUser,
    );
  }

  @Get('filter')
  findFoodByQuery(@Query('food') food: string) {
    return this.foodService.findFoodByQuery(food);
  }

  @Get('category/:shop/:category')
  findFoodByShopAndCategory(
    @Param('shop') profilename: string,
    @Param('category') category: string,
  ) {
    return this.foodService.findFoodByShopAndCategory(profilename, category);
  }

  //Metodo de Gaston Nro 1:
  @Get()
  findAllFoods() {
    return this.foodService.findAllFoods();
  }
  
  //Metodo de Gaston Nro 2:
  @Get('by-category/:categoryId')
  findFoodsByCategoryId(@Param('categoryId') categoryId: number) {
    return this.foodService.findFoodsByCategoryId(categoryId);
  }
}
