import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  //Metodo utilizado en la creacion del usuario (userService) para crear un nuevo perfil automaticamente cuando se crea el usuario, asignandoselo al mismo.
  create(profileDto: CreateProfileDto): Promise<Profile> {
    const profile: Profile = this.profileRepository.create({ ...profileDto });

    return this.profileRepository.save(profile);
  }

  findProfileByUser(user: User): Promise<Profile> {
    try {
      return this.profileRepository.findOne({
        where: { profileId: user.userId },
      });
    } catch (err) {
      throw new BadGatewayException(
        'ProfileService: Error trying to find profile by id',
      );
    }
  }

  async updateActiveUserProfile(
    file: Express.Multer.File,
    user: User,
    updatedProfile?: UpdateProfileDto,
  ): Promise<Profile> {
    try {
      const profile: Profile = await this.profileRepository.findOne({
        where: { user },
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      const newProfile: Profile = this.profileRepository.create({
        ...profile,
        ...updatedProfile,
        profilePicture: file?.filename,
      });

      return this.profileRepository.save(newProfile);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException('Profile service: Error trying to ');
    }
  }
}
