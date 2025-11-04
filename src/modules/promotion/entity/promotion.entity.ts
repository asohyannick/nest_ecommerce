import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Promotion extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ required: true, type: Number })
  discountPercentage: number;

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  endDate: Date;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);