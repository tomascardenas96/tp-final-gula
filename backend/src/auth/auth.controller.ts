import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() userRegister: RegisterDto) {
    return this.authService.register(userRegister)
  }

  @Post('/login')
  login(@Body() userLogin: LoginDto) {
    return
  }
}
