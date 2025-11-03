import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto, ResetPasswordDto } from '../user/dto/create_user_dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
@ApiTags('User Management Endpoints')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create-account')
    @ApiBody({ type: CreateUserDto })
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: CreateUserDto) {
        const user = await this.userService.register(body);
        return { success: true, message: "User registration is successful!", data: user };
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginUserDto) {
        const user = await this.userService.login(body);
        return { success: true, message: "User login is successful", user };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body('id') id: string) {
        const user = await this.userService.logout(id);
        return { success: true, message: "User has been logged out successfully!", data: user };
    }

    @Get('all-users')
    @HttpCode(HttpStatus.OK)
    async fetchAllUsers() {
        const users = await this.userService.fetchAllUsers();
        return { success: true, message: "Users have been fetched successfully!", data: users };
    }

    @Get('fetch-user/:id')
    @HttpCode(HttpStatus.OK)
    async fetchUser(@Param('id') id: string) {
        const user = await this.userService.fetchUser(id);
        return { success: true, message: "User has been fetched successfully!", data: user };
    }

    @Delete('remove-user/:id')
    @HttpCode(HttpStatus.OK)
    async deleteAccount(@Param('id') id: string) {
        const user = await this.userService.deleteAccount(id);
        return { success: true, message: "User has been deleted successfully!", data: user };
    }

    @Post('forgot-password')
    @ApiBody({ type: ForgotPasswordDto })
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body('email') email: string) {
        const message = await this.userService.forgotPassword(email);
        return { success: true, message };
    }

    @Post('reset-password')
    @ApiBody({ type: ResetPasswordDto })
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() body: ResetPasswordDto) {
        const message = await this.userService.resetPassword(body.email, body.code, body.newPassword);
        return { success: true, message };
    }

    @Patch('block-user/:id')
    @HttpCode(HttpStatus.OK)
    async blockUser(@Param('id') id: string) {
        const user = await this.userService.blockUser(id);
        return { success: true, message: "User has been blocked successfully!", data: user };
    }

    @Patch('unblock-user/:id')
    @HttpCode(HttpStatus.OK)
    async unBlockUser(@Param('id') id: string) {
        const user = await this.userService.unBlockUser(id);
        return { success: true, message: "User has been unblocked successfully!", data: user };
    }
}
