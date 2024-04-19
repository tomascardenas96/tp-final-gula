import {
  Controller,
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
  home() {
    return 'Perfil';
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  profile() {
    return 'Perfil';
  }
}
