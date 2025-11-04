import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoyaltyService } from "./loyalty.service";
import { CreateLoyaltyProgramDto } from "./dto/CreateLoyaltyProgramdto";
import { LoyaltyPoints } from "./entity/loyaltyPoints.entity";
import { RedeemLoyaltyPointsDto } from './dto/RedeemLoyaltyPointsDto';
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
import { RolesGuard } from "../../common/guards/role.guard";
@ApiTags('Loyalty and Rewards Programs Endpoints')
@Controller('api/loyalty')
export class LoyaltyController {
    constructor(private readonly loyaltyService: LoyaltyService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-program')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Loyalty program created successfully" })
    async createLoyaltyProgram(@Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto): Promise<void> {
        await this.loyaltyService.createLoyaltyProgram(createLoyaltyProgramDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get(':userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Loyalty points retrieved successfully", type: LoyaltyPoints })
    async getLoyaltyPoints(@Param('userId') userId: string): Promise<LoyaltyPoints> {
        return this.loyaltyService.getLoyaltyPoints(userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER)
    @Post('redeem')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Loyalty points redeemed successfully" })
    async redeemLoyaltyPoints(@Body() redeemLoyaltyPointsDto: RedeemLoyaltyPointsDto): Promise<void> {
        await this.loyaltyService.redeemLoyaltyPoints(redeemLoyaltyPointsDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('history/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Loyalty history retrieved successfully" })
    async getLoyaltyHistory(@Param('userId') userId: string): Promise<LoyaltyPoints[]> {
        return this.loyaltyService.getLoyaltyHistory(userId);
    }
}