import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from "./dto/CreatePromotionDto";
import { UpdatePromotionDto } from "./dto/UpdatePromotiondto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from '../../common/decorators/roles.decorators';
import { UserRole } from '../../common/enum/roles.enum';
@ApiTags('Promotion Management Endpoints')
@Controller('promotions')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-promo')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Promotion created successfully" })
    async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
        const promotion = await this.promotionService.createPromotion(createPromotionDto);
        return { success: true, message: "Promotion created successfully", data: promotion };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('retrieved-promotions')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Promotions retrieved successfully" })
    async getAllPromotions() {
        const promotions = await this.promotionService.getAllPromotions();
        return { success: true, message: "Promotions retrieved successfully", data: promotions };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-promo/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Promotion retrieved successfully" })
    async getPromotion(@Param('id') id: string) {
        const promotion = await this.promotionService.getPromotion(id);
        return { success: true, message: "Promotion retrieved successfully", data: promotion };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-promo/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Promotion updated successfully" })
    async updatePromotion(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
        const promotion = await this.promotionService.updatePromotion(id, updatePromotionDto);
        return { success: true, message: "Promotion updated successfully", data: promotion };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-promo/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Promotion deleted successfully" })
    async deletePromotion(@Param('id') id: string) {
        await this.promotionService.deletePromotion(id);
        return { success: true, message: "Promotion deleted successfully" };
    }
}