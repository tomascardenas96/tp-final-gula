import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
//modifique la importacion de user.service
import { UserService } from '../../src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterDto) {
    const findUserByEmail = await this.userService.findByEmail(user.email);

    if (findUserByEmail) {
      throw new BadRequestException('User already exists');
    }

    const roundSalt = 10;
    const salt = await bcryptjs.genSalt(roundSalt);

    await this.userService.create({
      ...user,
      password: await bcryptjs.hash(user.password, salt),
    });

    return {
      email: user.email,
      username: user.username,
      message: 'Register succesfull',
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new NotFoundException('User non-existent');
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Incorrect password');
    }

    //Estos son los datos que van a ir encriptados dentro del token.
    const payload = {
      userId: user.userId,
      profilename: user.profilename,
      username: user.username,
    };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new UnauthorizedException('Secret key not found');
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: secretKey,
    });

    return {
      token,
      email,
      message: 'success',
    };
  }
}
