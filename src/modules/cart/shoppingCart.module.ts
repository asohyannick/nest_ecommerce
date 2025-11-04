import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ShoppingCart, ShoppingCartSchema } from "./entity/shoppingCartEntity";
import { ShoppingCartService } from './shoppingCart.service';
import { ShoppingCartController } from './shoppingCart.controller';
@Module({
    imports: [MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }])],
    controllers: [ShoppingCartController],
    providers: [ShoppingCartService],
    exports: [ShoppingCartService],
})  
export class ShoppingCartModule {}