import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
//agregado
import { UserModule } from "src/user/user.module";
import { ShopModule } from 'src/shop/shop.module';
import { PostModule } from 'src/post/post.module';
import { FoodModule } from 'src/food/food.module';
import { CategoryModule } from 'src/category/category.module';
import { CartModule } from 'src/cart/cart.module';
import { FoodOnCartModule } from 'src/food_on_cart/food_on_cart.module';
import { AuthModule } from 'src/auth/auth.module';
import { SocketModule } from 'src/socket/socket.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:'mysql',
            host:'localhost',
            port:3306,
            username:'root',
            password:'root',
            database:'test',
            entities:[join(__dirname,'**','*.entity{.ts,.js}')],
            synchronize:true,
        }),
        //agregado
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
    ],
    //agregado
    controllers:[],
    providers:[]
})
export class AppTestModule{}