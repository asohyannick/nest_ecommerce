import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Subscription } from "./entity/subscription.entity";
import { CreateSubscriptionDto } from "./dto/CreateSubscriptionDto";

@Injectable()
export class SubscriptionService {
    constructor(@InjectModel(Subscription.name) private readonly subscriptionModel: Model<Subscription>) {}

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
        const subscription = new this.subscriptionModel(createSubscriptionDto);
        return subscription.save();
    }

    async getSubscription(id: string): Promise<Subscription> {
        const subscription = await this.subscriptionModel.findById(id).exec();
        if (!subscription) {
            throw new NotFoundException(`Subscription with ID ${id} not found`);
        }
        return subscription;
    }

    async getUserSubscriptions(userId: string): Promise<Subscription[]> {
        return this.subscriptionModel.find({ userId }).exec();
    }

    async cancelSubscription(id: string): Promise<void> {
        const result = await this.subscriptionModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Subscription with ID ${id} not found`);
        }
    }
}