import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { CartService } from '../cart/cart.service';

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

  async findUserByQuery(name: string) {//utiliza un patron de coincidencia parcial
    try {
      //intenta buscar usuarios cuyos nombres coincidan parcialmente con el nombre pasado porparametro
      return await this.userRepository.find({
        where: { name: ILike(`%${name}%`) },// Utiliza ILike para realizar una búsqueda case-insensitive y parcial
      // Esto significa que no es sensible a mayúsculas y minúsculas y encuentra coincidencias parciales.
      });
    } catch (err) {
      // Si ocurre un error durante la búsqueda, se lanza una excepción BadRequestException con un mensaje de error
      throw new BadRequestException({ message: err });// Lanza una excepción con el error capturado
    }
  }

  // async findByProfileName(profilename: string) {
  //   return await this.userRepository.findOneBy({ profilename });
  // }
}
