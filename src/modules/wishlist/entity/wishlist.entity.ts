import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Wishlist extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [{ itemId: String, itemName: String }], default: [] })
  items: WishlistItem[];
}

interface WishlistItem {
  itemId: string;
  itemName: string;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);