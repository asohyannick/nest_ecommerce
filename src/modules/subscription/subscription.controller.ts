import { Controller, Post, Get, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Subscription } from './entity/subscription.entity';
import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/CreateSubscriptionDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('Subscriptions and Memberships Endpoints')
@Controller('subscriptions')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('subscribe')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Subscription created successfully" })
    async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
        return this.subscriptionService.createSubscription(createSubscriptionDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-subscription/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Subscription retrieved successfully" })
    async getSubscription(@Param('id') id: string): Promise<Subscription> {
        return this.subscriptionService.getSubscription(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @Get('user/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User's subscriptions retrieved successfully" })
    async getUserSubscriptions(@Param('userId') userId: string): Promise<Subscription[]> {
        return this.subscriptionService.getUserSubscriptions(userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @Delete('delete-subscription/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Subscription canceled successfully" })
    async cancelSubscription(@Param('id') id: string): Promise<void> {
        return this.subscriptionService.cancelSubscription(id);
    }
}