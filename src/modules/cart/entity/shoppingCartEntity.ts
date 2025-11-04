import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CartItem } from './cartItem';
@Schema({ timestamps: true })
export class ShoppingCart extends Document {
    @Prop({
        type: String,
        unique: true,
        trim: true,
    })
    userId: string;

    @Prop({
        type: [{
            productId: { type: String },
            quantity: { type: Number },
            price: { type: Number },
        }],
        validate: {
            validator: (arr: any[]) => Array.isArray(arr) && arr.length > 0,
            message: 'Cart must have at least one item',
        },
    })
    items: CartItem[];

    @Prop({
        type: Number,
        default: 0,
    })
    totalPrice: number;

    @Prop({
        type: Number,
        default: 0,
    })
    discount?: number;

    @Prop({
        type: Number,
    })
    finalPrice: number;

    @Prop({
        type: Boolean,
        default: false,
    })
    checkedOut: boolean;

    @Prop({
        type: Date,
        default: Date.now,
    })
    date?: Date;

    @Prop({
        type: String,
        trim: true,
    })
    notes?: string;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);