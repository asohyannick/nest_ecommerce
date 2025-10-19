import { Injectable, NotFoundException, BadRequestException, ConflictException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InferType } from "yup";
import { createUserSchema } from "./schema/create-user-registration-schema";
import { loginUserSchema } from "./schema/user-login-schema";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { randomInt } from "crypto";
type CreateUserDto = InferType<typeof createUserSchema>;
type LoginUserDto = InferType<typeof loginUserSchema>;

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    private generateResetCode(): string {
        return randomInt(100000, 1000000).toString();
    }

    async register(createUserDto: CreateUserDto): Promise<{ user: User, tokens: { accessToken: string, refreshToken: string } }> {
        const validatedData = await createUserSchema.validate(createUserDto, {
            abortEarly: false,
            stripUnknown: true,
        });

        const existingUser = await this.userModel.findOne({ email: validatedData.email });
        if (existingUser) throw new ConflictException("User with this email already exist!");

        validatedData.password = await bcrypt.hash(validatedData.password, 10);

        const user = new this.userModel(validatedData as any);
        const payload = {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15'
        });
        const refreshToken = jwt.sign(payload, process.env.RFRESH_TOKEN_SECRET_KEY as string, {
            expiresIn: '7d'
        });
        user.refreshToken = refreshToken;
        await user.save();
        return {
            user,
            tokens: {
                accessToken,
                refreshToken
            }
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{ user: User, tokens: { accessToken: string, refreshToken: string } }> {
        const validatedData = await loginUserSchema.validate(loginUserDto, {
            abortEarly: false,
            stripUnknown: true,
        });

        const user = await this.userModel.findOne({ email: validatedData.email });
        if (!user) throw new NotFoundException("User not found");

        const isMatch = await bcrypt.compare(validatedData.password, user.password);
        if (!isMatch) throw new BadRequestException("Invalid credentials");
        const payload = {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
        const existingUser = await this.userModel.findOne({ email: validatedData.email });
        if (existingUser?.isAccountBlocked) throw new BadRequestException('Your account has been blocked. Contact admin for more details')
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15'
        });
        const refreshToken = jwt.sign(payload, process.env.RFRESH_TOKEN_SECRET_KEY as string, {
            expiresIn: '7d'
        });
        user.refreshToken = refreshToken;
        await user.save();

        return {
            user,
            tokens: {
                accessToken,
                refreshToken,
            }
        }
    }


    async fetchAllUsers(): Promise<User[]> {
        return this.userModel.find().sort({ createdAt: -1 }).exec();
    }

    async fetchUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException("User not found");
        return user;
    }

    async deleteAccount(id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) throw new NotFoundException("User not found");
        return user;
    }

    async logout(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found!');
        user.refreshToken = '';
        await user.save();
        return user;
    }

    async forgotPassword(email: string): Promise<string> {

        const user = await this.userModel.findOne({ email });

        if (!user) throw new NotFoundException('User not found!')

        const code = this.generateResetCode();

        const expires = new Date();

        expires.setMinutes(expires.getMinutes() + 15)

        user.passwordResetCode = code;

        user.passwordResetExpires = expires;

        await user.save();

        await this.transporter.sendMail({
            from: `"Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Password Reset Code',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
            <p style="color: #555; font-size: 16px;">Hello,</p>
            <p style="color: #555; font-size: 16px;">
            You recently requested to reset your account password. Use the code below to reset it. 
            <strong style="color: #000; font-size: 18px;">Do not share this code with anyone.</strong>
            </p>
            <p style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; padding: 15px 25px; font-size: 20px; color: #fff; background-color: #007BFF; border-radius: 6px; letter-spacing: 2px;">
                ${code}
            </span>
            </p>
            <p style="color: #555; font-size: 14px;">
            This code is valid for <strong>15 minutes</strong>. If you did not request a password reset, please ignore this email or contact our support team immediately.
            </p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} YourCompanyName. All rights reserved.
            </p>
        </div>
        `,
        });

        return 'Password reset code sent to your email';
    }

    async resetPassword(email: string, code: string, newPassword: string): Promise<string> {

        const user = await this.userModel.findOne({ email });

        if (!user) throw new NotFoundException('User not found!');

        if (!user.passwordResetCode || !user.passwordResetExpires) throw new BadRequestException("No reset request found!")

        if (user.passwordResetCode !== code) throw new BadRequestException("Invalid reset code")

        if (new Date() > user.passwordResetExpires) throw new BadRequestException("Reset code has expired!");

        user.password = await bcrypt.hash(newPassword, 10);

        user.passwordResetCode = null;

        user.passwordResetExpires = null;

        await user.save();

        return "Password has been reset successfully!"
    }
    async blockUser(userId: string): Promise<User> {

        const user = await this.userModel.findById(userId);

        if (!user) throw new NotFoundException('User not found!');

        if (user.isAccountBlocked) throw new BadRequestException('User is already blocked!');

        user.isAccountBlocked = true;

        await user.save();

        return user;
    }

    async unBlockUser(userId: string): Promise<User> {

        const user = await this.userModel.findById(userId);

        if (!user) throw new NotFoundException('User not found!');

        if (!user.isAccountBlocked) throw new BadRequestException('User is already blocked!');

        user.isAccountBlocked = false;

        await user.save();

        return user;
    }


}
