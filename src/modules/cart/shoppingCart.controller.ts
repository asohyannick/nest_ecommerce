import { Controller, Post, Get, Put, Delete, Param, HttpCode, HttpStatus, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateShoppingCartDto } from "./dto/createShoppingCartDto";
import { UpdateShoppingCartDto } from "./dto/updateShoppingCartDto";
import { ShoppingCartService } from './shoppingCart.service';
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('Shopping-Cart Management Endpoints')
@Controller('shopping-cart')
export class ShoppingCartController {

    constructor(private readonly shoppingCartService: ShoppingCartService) { };
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Post('create-cart')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Shopping cart created successfully" })
    async createShoppingCart(@Body() body: CreateShoppingCartDto) {
        const cart = await this.shoppingCartService.createShoppingCart(body);
        return { success: true, message: "Shopping cart created successfully", data: cart };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-carts')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shopping carts have been fetched successfully" })
    async fetchAllShoppingCarts() {
        const carts = await this.shoppingCartService.findAllShoppingCarts();
        return { success: true, message: "Shopping carts have been fetched successfully", data: carts }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Get('fetch-cart/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shopping cart has been fetched successfully" })
    async fetchShoppingCart(@Param('id') id: string) {
        const cart = await this.shoppingCartService.findOneShoppingCart(id);
        return { success: true, message: "Shopping cart has been fetched successfully", data: cart }
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Put('update-cart/:id')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 200, description: "Shopping cart has been updated successfully" })
    async updateShoppingCart(@Param('id') id: string, @Body() body: UpdateShoppingCartDto) {
        const cart = await this.shoppingCartService.updateOneShoppingCart(id, body);
        return { success: true, message: "Shopping cart has been updated successfully", data: cart };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @Delete('remove-cart/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Shopping cart has been deleted successfully" })
    async removeOneShoppingCart(@Param('id') id: string) {
        const cart = await this.shoppingCartService.removeOneShoppingCart(id);
        return { success: true, message: "Shopping cart has been deleted successfully", data: cart };
    }
}