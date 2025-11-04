import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Profile extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Full name cannot exceed 100 characters'],
    })
    fullName: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
    })
    email: string;

    @Prop({
        type: String,
        trim: true,
        required: false,
    })
    phoneNumber?: string;

    @Prop({
        type: Number,
        min: [0, 'Age must be at least 0'],
        required: false,
    })
    age?: number;

    @Prop({
        type: String,
        trim: true,
        required: false,
        maxlength: [500, 'Bio cannot exceed 500 characters'],
    })
    bio?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);