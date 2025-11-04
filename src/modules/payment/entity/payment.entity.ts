import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentStatus } from '../../../common/enum/payment.enum';
import { SupportedCurrencies } from '../../../common/enum/currency.enum';
@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  orderId: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ required: true, type: String })
  currency: SupportedCurrencies;

  @Prop({ required: true, type: String })
  paymentMethodId: string;

  @Prop({ required: true, type: String })
  status: PaymentStatus;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);