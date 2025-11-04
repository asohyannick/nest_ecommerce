import { Injectable, NotFoundException, BadRequestException, ConflictException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto, LoginUserDto } from "./dto/create_user_dto";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { randomInt } from "crypto";
import { assignRoleBasedOnEmail } from "../../common/utils/roleHelper";
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

        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) throw new ConflictException("User with this email already exist!");

        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const role = assignRoleBasedOnEmail(createUserDto.email);
        createUserDto.role = role;

        const user = new this.userModel(createUserDto);
        const payload = {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
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

    async login(
        loginUserDto: LoginUserDto
    ): Promise<{ user: User; tokens: { accessToken: string; refreshToken: string } }> {

        const MAX_FAILED_LOGIN_ATTEMPTS = 5;

        const user = await this.userModel.findOne({ email: loginUserDto.email });
        if (!user) throw new NotFoundException("User not found");


        if (user.isAccountBlocked) {
            throw new BadRequestException('Your account has been blocked. Contact admin for more details');
        }

        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isMatch) {

            user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

            if (user.failedLoginAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
                user.isAccountBlocked = true;
            }

            await user.save();

            const remainingAttempts = Math.max(0, MAX_FAILED_LOGIN_ATTEMPTS - user.failedLoginAttempts);
            throw new BadRequestException(
                `Invalid credentials. ${remainingAttempts} attempt(s) remaining.`
            );
        }

        user.failedLoginAttempts = 0;

        const payload = {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m',
        });

        const refreshToken = jwt.sign(payload, process.env.RFRESH_TOKEN_SECRET_KEY as string, {
            expiresIn: '7d',
        });

        user.refreshToken = refreshToken;
        await user.save();

        return {
            user,
            tokens: { accessToken, refreshToken },
        };
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
