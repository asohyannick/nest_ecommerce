import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Wishlist } from "./entity/wishlist.entity";
import { CreateWishlistDto } from "./dto/CreateWishlistDto";
import { AddItemDto } from "./dto/AddItemDto";
@Injectable()
export class WishlistService {
    constructor(@InjectModel(Wishlist.name) private readonly wishlistModel: Model<Wishlist>) {}

    async createWishlist(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
        const wishlist = new this.wishlistModel(createWishlistDto);
        return wishlist.save();
    }

    async getUserWishlist(userId: string): Promise<Wishlist> {
        const wishlist = await this.wishlistModel.findOne({ userId }).exec();
        if (!wishlist) {
            throw new NotFoundException(`Wishlist for user ID ${userId} not found`);
        }
        return wishlist;
    }

    async addItemToWishlist(userId: string, addItemDto: AddItemDto): Promise<Wishlist> {
        const wishlist = await this.getUserWishlist(userId);
        wishlist.items.push({ itemId: addItemDto.itemId, itemName: addItemDto.itemName });
        return wishlist.save();
    }

    async removeItemFromWishlist(userId: string, itemId: string): Promise<Wishlist> {
        const wishlist = await this.getUserWishlist(userId);
        wishlist.items = wishlist.items.filter(item => item.itemId !== itemId);
        return wishlist.save();
    }

    async clearWishlist(userId: string): Promise<void> {
        const wishlist = await this.getUserWishlist(userId);
        wishlist.items = [];
        await wishlist.save();
    }
}