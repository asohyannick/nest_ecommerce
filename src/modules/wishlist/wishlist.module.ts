import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wishlist } from "./entity/wishlist.entity";
import { WishlistSchema } from "./entity/wishlist.entity";
import { WishlistController } from "./wishList.controller";
import { WishlistService } from "./wishList.service";
import { AuthModule } from "../auth/auth.module";
@Module({
    imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }]),
    AuthModule
],
    controllers: [WishlistController],
    providers: [WishlistService],
    exports: [WishlistService],
})

export class WishlistModule { }