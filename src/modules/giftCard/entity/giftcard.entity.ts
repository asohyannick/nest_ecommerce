import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class GiftCard extends Document {
    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ required: true, type: Number })
    value: number;

    @Prop({ type: String })
    message: string;
}

export const GiftCardSchema = SchemaFactory.createForClass(GiftCard);