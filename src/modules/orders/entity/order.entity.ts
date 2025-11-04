import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../../../common/enum/order.enum';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({
    type: [{
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }],
    required: true,
  })
  items: OrderItem[];

  @Prop({ required: true, type: Number })
  totalPrice: number;

  @Prop({ required: true, type: String })
  shippingAddress: string;

  @Prop({
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Prop({ required: true, type: String })
  paymentMethod: string;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);