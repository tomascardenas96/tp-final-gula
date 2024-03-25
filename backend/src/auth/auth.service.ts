import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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

  login() {}
}
