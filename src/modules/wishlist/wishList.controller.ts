import { Controller, Post, Get, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WishlistService } from "./wishList.service";
import { CreateWishlistDto } from "./dto/CreateWishlistDto";
import { AddItemDto } from "./dto/AddItemDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('Wishlist Management Endpoints')
@Controller('wishlists')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('create-wishlist')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Wishlist created successfully" })
    async createWishlist(@Body() createWishlistDto: CreateWishlistDto) {
        const wishlist = await this.wishlistService.createWishlist(createWishlistDto);
        return { success: true, message: "Wishlist created successfully", data: wishlist };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('fetch-wishlist/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Wishlist retrieved successfully" })
    async getUserWishlist(@Param('userId') userId: string) {
        const wishlist = await this.wishlistService.getUserWishlist(userId);
        return { success: true, message: "Wishlist retrieved successfully", data: wishlist };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post(':userId/items')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Item added to wishlist successfully" })
    async addItemToWishlist(@Param('userId') userId: string, @Body() addItemDto: AddItemDto) {
        const wishlist = await this.wishlistService.addItemToWishlist(userId, addItemDto);
        return { success: true, message: "Item added to wishlist successfully", data: wishlist };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Delete(':userId/items/:itemId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Item removed from wishlist successfully" })
    async removeItemFromWishlist(@Param('userId') userId: string, @Param('itemId') itemId: string) {
        const wishlist = await this.wishlistService.removeItemFromWishlist(userId, itemId);
        return { success: true, message: "Item removed from wishlist successfully", data: wishlist };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Delete(':userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Wishlist cleared successfully" })
    async clearWishlist(@Param('userId') userId: string) {
        await this.wishlistService.clearWishlist(userId);
        return { success: true, message: "Wishlist cleared successfully" };
    }
}