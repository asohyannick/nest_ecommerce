import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { LoyaltyProgram } from "./entity/loyalty.entity";
import { LoyaltyPoints } from "./entity/loyaltyPoints.entity";
import { CreateLoyaltyProgramDto } from "./dto/CreateLoyaltyProgramdto";
import { RedeemLoyaltyPointsDto } from "./dto/RedeemLoyaltyPointsDto";

@Injectable()
export class LoyaltyService {
    constructor(
        @InjectModel(LoyaltyProgram.name) private readonly loyaltyProgramModel: Model<LoyaltyProgram>,
        @InjectModel(LoyaltyPoints.name) private readonly loyaltyPointsModel: Model<LoyaltyPoints>,
    ) {}

    async createLoyaltyProgram(createLoyaltyProgramDto: CreateLoyaltyProgramDto): Promise<void> {
        const loyaltyProgram = new this.loyaltyProgramModel(createLoyaltyProgramDto);
        await loyaltyProgram.save();
    }

    async getLoyaltyPoints(userId: string): Promise<LoyaltyPoints> {
        const points = await this.loyaltyPointsModel.findOne({ userId }).exec();
        if (!points) {
            throw new NotFoundException(`No loyalty points found for user ID ${userId}`);
        }
        return points;
    }

    async redeemLoyaltyPoints(redeemLoyaltyPointsDto: RedeemLoyaltyPointsDto): Promise<void> {
        const { userId, points } = redeemLoyaltyPointsDto;
        const userPoints = await this.loyaltyPointsModel.findOne({ userId }).exec();
        if (!userPoints || userPoints.points < points) {
            throw new NotFoundException(`Insufficient points for user ID ${userId}`);
        }

        userPoints.points -= points;
        await userPoints.save();

        // Record the redemption action
        const loyaltyHistory = new this.loyaltyPointsModel({
            userId,
            points: -points,
            action: 'redeem',
        });
        await loyaltyHistory.save();
    }

    async getLoyaltyHistory(userId: string): Promise<LoyaltyPoints[]> {
        return this.loyaltyPointsModel.find({ userId }).exec();
    }
}