import { Controller, Post, Get, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from "./dto/paymentDto";
import { RefundPaymentDto } from "./dto/refundPaymentDto";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from '../../common/decorators/roles.decorators';
import { UserRole } from '../../common/enum/roles.enum';
@ApiTags('Payment Management Endpoints')
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('make-payment')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Payment created successfully" })
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        const payment = await this.paymentService.createPayment(createPaymentDto);
        return { success: true, message: "Payment created successfully", data: payment };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('fetch-payment/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Payment retrieved successfully" })
    async getPayment(@Param('id') id: string) {
        const payment = await this.paymentService.getPayment(id);
        return { success: true, message: "Payment retrieved successfully", data: payment };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('fetch-user-payment/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Payments retrieved successfully for user" })
    async getUserPayments(@Param('userId') userId: string) {
        const payments = await this.paymentService.getUserPayments(userId);
        return { success: true, message: "Payments retrieved successfully", data: payments };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('refund-payment')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Refund processed successfully" })
    async refundPayment(@Body() refundPaymentDto: RefundPaymentDto) {
        const payment = await this.paymentService.refundPayment(refundPaymentDto);
        return { success: true, message: "Refund processed successfully", data: payment };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('payment-methods')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Payment methods retrieved successfully" })
    async getPaymentMethods() {
        const methods = await this.paymentService.getPaymentMethods();
        return { success: true, message: "Payment methods retrieved successfully", data: methods };
    }
}