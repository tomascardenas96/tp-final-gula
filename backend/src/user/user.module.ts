import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfileModule, CartModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
