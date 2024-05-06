import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
//modifique la importacion de user.service
import { UserService } from 'src/user/user.service';
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

  async register({ email, name, password, location, birthDate }: RegisterDto) {
    const findUserByEmail = await this.userService.findByEmail(email);
    //check if the Email is null o undefined
    if(!email){
      throw new BadRequestException('Email cannot be empty');
    }
    //check if other required field are null or undefined
    if(!name || !password){
      throw new BadRequestException('Name and password are required')
    }
    //check if Email is already in use
    if (findUserByEmail) {
      throw new BadRequestException('User already exists');
    }

    //generate the Hash of the password
    const roundSalt = 10;
    const salt = await bcryptjs.genSalt(roundSalt);

    await this.userService.create({
      email,
      name,
      location,
      birthDate,
      password: await bcryptjs.hash(password, salt),
    });

    //return a object with the user's infoormation registred  
    return {
      email: email,
      username: name,
      message: 'Register successful',
    };
  } 

  async login({ email, password }: LoginDto) {
    //****** */
    //console.log(password);
    //const roundSalt = 10;
    //const salt = await bcryptjs.genSalt(roundSalt);
    //const passwordhash= await bcryptjs.hash(password, salt);
    //console.log(passwordhash);
    //*////
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
      email: user.email,
      name: user.name,
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
