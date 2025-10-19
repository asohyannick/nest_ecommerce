import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { UserService } from './user.service';
import { YupValidationPipe } from "../../common/pipes/globalValidator";
import { createUserSchema } from "./schema/create-user-registration-schema";
import { loginUserSchema } from "./schema/user-login-schema";
import { CreateUserDto, LoginUserDto, ForgotPasswordDto, ResetPasswordDto } from '../user/dto/create_user_dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create-account')
    @ApiBody({ type: CreateUserDto })
    @HttpCode(HttpStatus.CREATED)
    async register(@Body(new YupValidationPipe(createUserSchema)) body: CreateUserDto) {
        const user = await this.userService.register(body);
        return { message: "User registration is successful!", user };
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    @HttpCode(HttpStatus.OK)
    async login(@Body(new YupValidationPipe(loginUserSchema)) body: LoginUserDto) {
        const user = await this.userService.login(body);
        return { message: "User login is successful", user };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body('id') id: string) {
        const user = await this.userService.logout(id);
        return { message: "User has been logged out successfully!", user };
    }

    @Get('all-users')
    @HttpCode(HttpStatus.OK)
    async fetchAllUsers() {
        const users = await this.userService.fetchAllUsers();
        return { message: "Users have been fetched successfully!", users };
    }

    @Get('fetch-user/:id')
    @HttpCode(HttpStatus.OK)
    async fetchUser(@Param('id') id: string) {
        const user = await this.userService.fetchUser(id);
        return { message: "User has been fetched successfully!", user };
    }

    @Delete('remove-user/:id')
    @HttpCode(HttpStatus.OK)
    async deleteAccount(@Param('id') id: string) {
        const user = await this.userService.deleteAccount(id);
        return { message: "User has been deleted successfully!", user };
    }

    @Post('forgot-password')
    @ApiBody({ type: ForgotPasswordDto })
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body('email') email: string) {
        const message = await this.userService.forgotPassword(email);
        return { message };
    }

    @Post('reset-password')
    @ApiBody({ type: ResetPasswordDto })
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() body: ResetPasswordDto) {
        const message = await this.userService.resetPassword(body.email, body.code, body.newPassword);
        return { message };
    }

    @Patch('block-user/:id')
    @HttpCode(HttpStatus.OK)
    async blockUser(@Param('id') id: string) {
        const user = await this.userService.blockUser(id);
        return { message: "User has been blocked successfully!", user };
    }

    @Patch('unblock-user/:id')
    @HttpCode(HttpStatus.OK)
    async unBlockUser(@Param('id') id: string) {
        const user = await this.userService.unBlockUser(id);
        return { message: "User has been unblocked successfully!", user };
    }
}
