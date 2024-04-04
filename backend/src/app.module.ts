import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { PostModule } from './post/post.module';
import { FoodModule } from './food/food.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { FoodOnCartModule } from './food_on_cart/food_on_cart.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'tp-gula',
      username: 'root',
      password: 'root',
      entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    UserModule,
    ShopModule,
    PostModule,
    FoodModule,
    CategoryModule,
    CartModule,
    FoodOnCartModule,
    AuthModule,
    SocketModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
