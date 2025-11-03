import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    minlength: [5, 'Description must be at least 5 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  })
  description: string;

  @Prop({
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0'],
  })
  price: number;

  @Prop({
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
  })
  stock: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  isFeatured: boolean;

  @Prop({
    type: [String],
    default: [],
    validate: {
      validator: (arr: string[]) => Array.isArray(arr) && arr.every((v) => typeof v === 'string'),
      message: 'Each image must be a string',
    },
  })
  images: string[];

  @Prop({
    type: String,
    trim: true,
    default: 'Uncategorized',
    index: true,
    maxlength: [100, 'Category name cannot exceed 100 characters'],
  })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

