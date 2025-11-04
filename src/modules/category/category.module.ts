import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategoryModel } from "./entity/category.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { AuthModule } from "../auth/auth.module";
@Module({
    imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategoryModel }]), AuthModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})  
export class CategoryModule {}