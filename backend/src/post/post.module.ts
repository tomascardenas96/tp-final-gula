import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    ShopModule,
    UserModule,
    SocketModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
