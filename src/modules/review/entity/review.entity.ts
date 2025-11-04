import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ required: true, type: String })
    productId: string;

    @Prop({ required: true, type: Number })
    rating: number;

    @Prop({ type: String })
    reviewText?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);