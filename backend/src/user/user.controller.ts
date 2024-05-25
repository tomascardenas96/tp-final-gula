import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { UpdateProfileDto } from '../user/dto/update-profile';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('filter')
  findUserByQuery(@Query('name') name: string) {
    return this.userService.findUserByQuery(name);
  }

  @Get('profile')
  findProfileByActiveUser(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.userService.findProfileByActiveUser(activeUser);
  }

  @Patch('profile/update')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/uploads/profile',
        filename: (req, file, cb) => {
          // Usa el nombre original del archivo con su extensión
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
  updateActiveUserProfile(
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() activeUser: ActiveUserInterface,
    @Body() updatedProfile: UpdateProfileDto,
  ) {
    return this.userService.updateActiveUserProfile(file, activeUser, updatedProfile);
  }
}
