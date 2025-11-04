import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Subscription extends Document {
    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ required: true, type: String })
    subscriptionType: string;

    @Prop({ required: true, type: String, default: 'active' })
    status: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);