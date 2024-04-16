import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly cartService: CartService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    //Al crear un usuario nuevo, automaticamente se crea una instancia de profile y otra de cart, y se le asignan al nuevo usuario recientemente creado.
    const profile = await this.profileService.create({
      profileName: user.email,
      location: user.location,
      birthDate: user.birthDate,
    });
    const cart = await this.cartService.create();

    const newUser: User = this.userRepository.create({
      email: user.email,
      name: user.name,
      password: user.password,
      profile,
      cart,
    });

    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['userId', 'email', 'name', 'password', 'createdAt'],
    });
  }

  async findByUserName(name: string) {
    return await this.userRepository.findOneBy({ name });
  }

  // async findByProfileName(profilename: string) {
  //   return await this.userRepository.findOneBy({ profilename });
  // }
}
