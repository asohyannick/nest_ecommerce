import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
    IsString,
    IsEmail,
    IsOptional,
    MinLength,
    MaxLength,
    IsBoolean,
    Matches,
    IsNumber,
    IsEnum,
} from 'class-validator';
import { UserRole } from '../../../common/enum/roles.enum';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ trim: true, required: true })
    @IsString({ message: 'First name must be a string' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(50, { message: 'First name must not exceed 50 characters' })
    firstName: string;

    @Prop({ trim: true, required: true })
    @IsString({ message: 'Last name must be a string' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
    lastName: string;

    @Prop({ trim: true, unique: true, lowercase: true, required: true })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @Prop({ trim: true, required: true })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])/, {
        message:
            'Password must contain uppercase, lowercase, number, and special character',
    })
    password: string;

    @Prop({ trim: true, default: null })
    @IsOptional()
    @IsString({ message: 'Refresh token must be a string' })
    refreshToken?: string;

    @Prop({ default: false })
    @IsOptional()
    @IsBoolean({ message: 'isAccountBlocked must be a boolean' })
    isAccountBlocked?: boolean;

    @Prop({ type: String, default: null })
    @IsOptional()
    @IsString({ message: 'Password reset code must be a string' })
    passwordResetCode?: string | null;

    @Prop({ type: String, enum: UserRole, default: UserRole.CUSTOMER })  
    @IsOptional()
    @IsEnum(UserRole, { message: 'Invalid user role' })
    role: UserRole;

    @Prop({ type: Date, default: null })
    @IsOptional()
    passwordResetExpires?: Date | null;
    @Prop({ default: 0 })
    @IsOptional()
    @IsNumber({}, { message: 'failedLoginAttempts must be a number' })
    failedLoginAttempts: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// ✅ Hide sensitive fields when sending to client
UserSchema.set('toJSON', {
    transform: (_: any, ret: any) => {
        delete ret.password;
        delete ret.passwordResetCode;
        delete ret.passwordResetExpires;
        delete ret.refreshToken;
        delete ret.failedLoginAttempts;
        return ret;
    },
});
