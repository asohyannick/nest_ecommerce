import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GiftCardService } from "./giftCard.service";
import { CreateGiftCardDto } from "./dto/CreateGiftCardDto";
import { GiftCard } from "./entity/giftcard.entity";
import { UpdateGiftCardDto } from './dto/UpdateGiftCardDto';
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('Gift Cards Management Endpoints')
@Controller('gift-cards')
export class GiftCardController {
    constructor(private readonly giftCardService: GiftCardService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-gift-card')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Gift card created successfully", type: GiftCard })
    async createGiftCard(@Body() createGiftCardDto: CreateGiftCardDto): Promise<GiftCard> {
        return this.giftCardService.createGiftCard(createGiftCardDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-gift-card/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Gift card retrieved successfully", type: GiftCard })
    async getGiftCard(@Param('id') id: string): Promise<GiftCard> {
        return this.giftCardService.getGiftCard(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER)
    @Get('user/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User's gift cards retrieved successfully", type: [GiftCard] })
    async getUserGiftCards(@Param('userId') userId: string): Promise<GiftCard[]> {
        return this.giftCardService.getUserGiftCards(userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-gift-card/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Gift card updated successfully", type: GiftCard })
    async updateGiftCard(@Param('id') id: string, @Body() updateGiftCardDto: UpdateGiftCardDto): Promise<GiftCard> {
        return this.giftCardService.updateGiftCard(id, updateGiftCardDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('delete-gift-card/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Gift card deleted successfully" })
    async deleteGiftCard(@Param('id') id: string): Promise<GiftCard[]> {
        return this.giftCardService.deleteGiftCard(id);
    }
}