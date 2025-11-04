import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/orderDto";
import { OrderService } from './order.service';
import { UserRole } from "../../common/enum/roles.enum";
import { UpdateOrderDto } from "./dto/updateOrderDto";
@ApiTags('Order Management Endpoints')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('create-order')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Order created successfully" })
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const order = await this.orderService.createOrder(createOrderDto);
        return { success: true, message: "Order created successfully", data: order };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('fetch-order/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Order retrieved successfully" })
    async getOrder(@Param('id') id: string) {
        const order = await this.orderService.getOrder(id);
        return { success: true, message: "Order retrieved successfully", data: order };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('fetch-user-order/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Orders retrieved successfully for user" })
    async getUserOrders(@Param('userId') userId: string) {
        const orders = await this.orderService.getUserOrders(userId);
        return { success: true, message: "Orders retrieved successfully", data: orders };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Put('update-order/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Order updated successfully" })
    async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        const order = await this.orderService.updateOrder(id, updateOrderDto);
        return { success: true, message: "Order updated successfully", data: order };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Delete('delete-order/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Order deleted successfully" })
    async deleteOrder(@Param('id') id: string) {
        await this.orderService.deleteOrder(id);
        return { success: true, message: "Order deleted successfully" };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('cancel-order/:id/cancel')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Order canceled successfully" })
    async cancelOrder(@Param('id') id: string) {
        const order = await this.orderService.cancelOrder(id);
        return { success: true, message: "Order canceled successfully", data: order };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('pay-for-order/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Payment processed successfully" })
    async payOrder(@Param('id') id: string) {
        const order = await this.orderService.payOrder(id);
        return { success: true, message: "Payment processed successfully", data: order };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('track-order/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Tracking info retrieved successfully" })
    async getTrackingInfo(@Param('id') id: string) {
        const trackingInfo = await this.orderService.getTrackingInfo(id);
        return { success: true, message: "Tracking info retrieved successfully", data: trackingInfo };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('return-order/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Return initiated successfully" })
    async returnOrder(@Param('id') id: string) {
        const order = await this.orderService.returnOrder(id);
        return { success: true, message: "Return initiated successfully", data: order };
    }
}