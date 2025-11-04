import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Review } from "./entity/review.entity";
import { CreateReviewDto } from "./dto/CreateReviewDto";
import { UpdateReviewDto } from "./dto/UpdateReviewDto";
@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        const newReview = new this.reviewModel(createReviewDto);
        return newReview.save();
    }

    async getAllReviews(): Promise<Review[]> {
        return this.reviewModel.find().exec();
    }

    async getReview(id: string): Promise<Review> {
        const review = await this.reviewModel.findById(id).exec();
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }

    async updateReview(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
        const review = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto, { new: true, runValidators: true }).exec();
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }

    async deleteReview(id: string): Promise<void> {
        const result = await this.reviewModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
    }
}