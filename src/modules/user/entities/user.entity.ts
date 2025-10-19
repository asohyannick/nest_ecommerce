import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ trim: true })
    firstName: string;

    @Prop({ trim: true })
    lastName: string;

    @Prop({ trim: true, unique: true, lowercase: true })
    email: string;

    @Prop({ trim: true })
    password: string;

    @Prop({ trim: true, default: null })
    refreshToken?: string;

    @Prop({ default: false })
    isAccountBlocked?: boolean;

    @Prop({ type: String, default: null })
    passwordResetCode?: string | null;

    @Prop({ type: Date, default: null })
    passwordResetExpires?: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
    transform: (_: any, ret: any) => {
        delete ret.password;
        delete ret.passwordResetCode,
        delete ret.passwordResetExpires,
        delete ret.refreshToken
        return ret;
    },
});
