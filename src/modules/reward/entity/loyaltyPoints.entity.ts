import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class LoyaltyPoints extends Document {
    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ required: true, type: Number, default: 0 })
    points: number;

    @Prop({ required: true, type: String })
    action: string; // e.g., 'redeem', 'earn'
}

export const LoyaltyPointsSchema = SchemaFactory.createForClass(LoyaltyPoints);