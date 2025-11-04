import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class LoyaltyProgram extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: Number })
    pointsRequired: number;
}

export const LoyaltyProgramSchema = SchemaFactory.createForClass(LoyaltyProgram);