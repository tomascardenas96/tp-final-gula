import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto): Promise<User> {
  
    const newUser: User = this.userRepository.create({
      ...user,
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
