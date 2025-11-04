import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
    @Prop({
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Category name cannot exceed 100 characters'],
    })
    name: string;

    @Prop({
        type: String,
        trim: true,
        required: false,
        maxlength: [500, 'Category description cannot exceed 500 characters'],
    })
    description?: string;

    @Prop({
        type: [String],
        default: [],
        validate: {
            validator: (arr: string[]) => Array.isArray(arr) && arr.every((v) => typeof v === 'string'),
            message: 'Subcategories must be an array of strings',
        },
    })
    subCategories?: string[];

    @Prop({
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    })
    status?: 'active' | 'inactive';

    @Prop({
        type: Boolean,
        default: false,
    })
    isFeatured?: boolean;

    @Prop({
        type: Number,
        default: 0,
    })
    displayOrder?: number;
    @Prop({
        type: Date,
        default: Date.now,
    })
    date?: Date;
}

export const CategoryModel = SchemaFactory.createForClass(Category);