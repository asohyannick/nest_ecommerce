import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { GiftCard } from "./entity/giftcard.entity";
import { CreateGiftCardDto } from "./dto/CreateGiftCardDto";
import { UpdateGiftCardDto } from "./dto/UpdateGiftCardDto";

@Injectable()
export class GiftCardService {
    constructor(@InjectModel(GiftCard.name) private readonly giftCardModel: Model<GiftCard>) {}

    async createGiftCard(createGiftCardDto: CreateGiftCardDto): Promise<GiftCard> {
        const giftCard = new this.giftCardModel(createGiftCardDto);
        return giftCard.save();
    }

    async getGiftCard(id: string): Promise<GiftCard> {
        const giftCard = await this.giftCardModel.findById(id).exec();
        if (!giftCard) {
            throw new NotFoundException(`Gift card with ID ${id} not found`);
        }
        return giftCard;
    }

    async getUserGiftCards(userId: string): Promise<GiftCard[]> {
        return this.giftCardModel.find({ userId }).exec();
    }

    async updateGiftCard(id: string, updateGiftCardDto: UpdateGiftCardDto): Promise<GiftCard> {
        const giftCard = await this.giftCardModel.findByIdAndUpdate(id, updateGiftCardDto, { new: true, runValidators: true }).exec();
        if (!giftCard) {
            throw new NotFoundException(`Gift card with ID ${id} not found`);
        }
        return giftCard;
    }

    async deleteGiftCard(id: string): Promise<GiftCard[]> {
        const result = await this.giftCardModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Gift card with ID ${id} not found`);
        }
        return [result];
    }
}
       