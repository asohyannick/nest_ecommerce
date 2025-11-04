import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Promotion } from "./entity/promotion.entity";
import { CreatePromotionDto } from "./dto/CreatePromotionDto";
import { UpdatePromotionDto } from './dto/UpdatePromotiondto';
@Injectable()
export class PromotionService {
    constructor(@InjectModel(Promotion.name) private readonly promotionModel: Model<Promotion>) {}

    async createPromotion(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
        const promotion = new this.promotionModel(createPromotionDto);
        return promotion.save();
    }

    async getAllPromotions(): Promise<Promotion[]> {
        return this.promotionModel.find().exec();
    }

    async getPromotion(id: string): Promise<Promotion> {
        const promotion = await this.promotionModel.findById(id).exec();
        if (!promotion) {
            throw new NotFoundException(`Promotion with ID ${id} not found`);
        }
        return promotion;
    }

    async updatePromotion(id: string, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
        const promotion = await this.promotionModel.findByIdAndUpdate(id, updatePromotionDto, { new: true, runValidators: true }).exec();
        if (!promotion) {
            throw new NotFoundException(`Promotion with ID ${id} not found`);
        }
        return promotion;
    }

    async deletePromotion(id: string): Promise<void> {
        const result = await this.promotionModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Promotion with ID ${id} not found`);
        }
    }
}