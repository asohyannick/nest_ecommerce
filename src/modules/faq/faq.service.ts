import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Faq } from "./entity/faq.entity";
import { CreateFaqDto } from "./dto/CreateFaqDto";
import { UpdateFaqDto } from './dto/UpdateFaqDto';

@Injectable()
export class FaqService {
    constructor(@InjectModel(Faq.name) private readonly faqModel: Model<Faq>) {}

    async createFaq(createFaqDto: CreateFaqDto): Promise<Faq> {
        const faq = new this.faqModel(createFaqDto);
        return faq.save();
    }

    async getAllFaqs(): Promise<Faq[]> {
        return this.faqModel.find().exec();
    }

    async getFaqById(id: string): Promise<Faq> {
        const faq = await this.faqModel.findById(id).exec();
        if (!faq) {
            throw new NotFoundException(`FAQ with ID ${id} not found`);
        }
        return faq;
    }

    async updateFaq(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq> {
        const faq = await this.faqModel.findByIdAndUpdate(id, updateFaqDto, { new: true, runValidators: true }).exec();
        if (!faq) {
            throw new NotFoundException(`FAQ with ID ${id} not found`);
        }
        return faq;
    }

    async deleteFaq(id: string): Promise<Faq> {
        const result = await this.faqModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`FAQ with ID ${id} not found`);
        }
        return result;
    }
}