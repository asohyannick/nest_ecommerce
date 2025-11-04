import { Controller, Post, Get, Put, Delete, Param, Body, HttpStatus, HttpCode, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProfileDto } from "./dto/profileDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('Profile Management Endpoints')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-profile')
    @ApiBody({ type: ProfileDto })
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: "Create a new user profile" })
    @ApiResponse({ status: 201, description: "Profile has been created successfully." })
    @ApiResponse({ status: 404, description: "Profile not found." })
    async createProfile(@Body() body: ProfileDto) {
        const profile = await this.profileService.createProfile(body);
        return { success: true, message: "Profile created successfully!", data: profile };
    }

    @Get('fetch-profile/:id')
    @HttpCode(HttpStatus.OK)
    async fetchProfile(@Param('id') id: string) {
        const profile = await this.profileService.getProfileById(id);
        return { success: true, message: "Profile fetched successfully!", data: profile };
    }

    @Get('all-profiles')
    @HttpCode(HttpStatus.OK)
    async fetchAllProfiles() {
        const profiles = await this.profileService.fetchAllUserProfiles();
        return { success: true, message: "Profiles fetched successfully!", data: profiles };
    }

    @Put('update-profile/:id')
    @ApiBody({ type: ProfileDto })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Update an existing user profile" })
    @ApiResponse({ status: 200, description: "Profile has been updated successfully." })
    async updateProfile(@Param('id') id: string, @Body() body: ProfileDto) {
        const profile = await this.profileService.updateProfile(id, body);
        return { success: true, message: "Profile updated successfully!", data: profile };
    }

    @Delete('delete-profile/:id')
    @HttpCode(HttpStatus.OK)
    async deleteProfile(@Param('id') id: string) {
        const profile = await this.profileService.deleteProfile(id);
        return { success: true, message: "Profile deleted successfully!", data: profile };
    }

}