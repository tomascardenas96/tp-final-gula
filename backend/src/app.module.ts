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
import { ProfileModule } from './profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PaymentsModule } from './payments/payments.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'tp-gula-2',
      username: 'root',
      password: '',
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
    ProfileModule,
    //Para poder acceder a una ruta estatica, como es este caso la carpeta uploads donde se guardan las fotos que suben los usuarios.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),
    PaymentsModule,
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
