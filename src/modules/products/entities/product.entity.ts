import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ trim: true }) 
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop()
  price: number; 

  @Prop()
  stock: number;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ index: true, default: 'Uncategorized' })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

