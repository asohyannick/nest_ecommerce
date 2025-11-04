import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ShoppingCart, ShoppingCartSchema } from "./entity/shoppingCartEntity";
import { ShoppingCartService } from './shoppingCart.service';
import { ShoppingCartController } from './shoppingCart.controller';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
@Module({
    imports: [MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]),
        UserModule,
        AuthModule
    ],
    controllers: [ShoppingCartController],
    providers: [ShoppingCartService],
    exports: [ShoppingCartService],
})
export class ShoppingCartModule { }