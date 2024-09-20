import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ActiveUser } from '../common/decorator/active-user.decorator';
import { ActiveUserInterface } from '../common/interface/active-user.interface';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() userRegister: RegisterDto) {
    return this.authService.register(userRegister);
  }

  @Post('/login')
  login(@Body() userLogin: LoginDto) {
    return this.authService.login(userLogin);
  }

  @UseGuards(AuthGuard)
  @Get('/home')
  home(@ActiveUser() user: ActiveUserInterface) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  profile(@ActiveUser() user: ActiveUserInterface) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/settings')
  settings(@ActiveUser() user: ActiveUserInterface) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('shops')
  shops(@ActiveUser() user: ActiveUserInterface) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('shop-profile/:profilename')
  shopProfile(@ActiveUser() user: ActiveUserInterface) {
    return user;
  }

  //Metodos Get para implementar la Autenticacion con cuenta de Google:
  @Get('google')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(PassportAuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return { user: req.user };
}
}
