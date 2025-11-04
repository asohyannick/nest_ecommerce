import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from './entity/category.entity';
@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly CategoryModel: Model<Category>) { }

    async createProductCategory(categoryData: Partial<Category>): Promise<Category> {
        const newCategory = new this.CategoryModel(categoryData);
        return newCategory.save();
    }

    async fetchProductCategories(): Promise<Category[]> {
        return this.CategoryModel.find().exec();
    }

    async fetchProductCategory(id: string): Promise<Category | null> {
        const category = await this.CategoryModel.findById(id);
        if (!category) throw new NotFoundException('Category not found!');
        return category;
    }

    async updateProductCategory(id: string, categoryData: Partial<Category>): Promise<Category | null> {
        const category = await this.CategoryModel.findByIdAndUpdate(id, categoryData, { new: true });
        if (!category) throw new NotFoundException('Category not found!');
        return category;
    }

    async deleteProductCategory(id: string): Promise<Category | null> {
        const category = await this.CategoryModel.findByIdAndDelete(id);
        return category;
    }
}