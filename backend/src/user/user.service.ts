import {
  BadRequestException,
  Injectable,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { CartService } from '../cart/cart.service';
import { ActiveUserInterface } from 'src/common/interface/active-user.interface';
import { UpdateProfileDto } from '../user/dto/update-profile';
import { Profile } from 'src/profile/entities/profile.entity';
//agregar express drom express si es ncesario
//agregar Multer from Multer si es necesario


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

  async findByUserName(name: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ name });
    } catch (err) {
      throw new BadGatewayException(
        'User service: Error trying to find user by name',
      );
    }
  }

  async findUserByQuery(name: string): Promise<User[]> {
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

  async findProfileByActiveUser(
    activeUser: ActiveUserInterface,
  ): Promise<Profile> {
    try {
      const user: User = await this.findByEmail(activeUser.email);
      if (!user) {
        throw new NotFoundException('User service: user cannot be found');
      }
      const profile: Profile =
        await this.profileService.findProfileByUser(user);
      return profile;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException(
        'User service: error in method findProfileByActiveUser',
      );
    }
  }

  async updateActiveUserProfile(
    file: Express.Multer.File,
    activeUser: ActiveUserInterface,
    updatedProfile: UpdateProfileDto,
  ): Promise<Profile> {
    const user: User = await this.userRepository.findOne({
      where: { email: activeUser.email },
    });

    return await this.profileService.updateActiveUserProfile(
      file,
      user,
      updatedProfile,
    );
  }
}
