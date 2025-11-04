import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wishlist } from "./entity/wishlist.entity";
import { WishlistSchema } from "./entity/wishlist.entity";
import { WishlistController } from "./wishList.controller";
import { WishlistService } from "./wishList.service";
@Module({
    imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }])],
    controllers: [WishlistController],
    providers: [WishlistService],
    exports: [WishlistService],
})

export class WishlistModule { }