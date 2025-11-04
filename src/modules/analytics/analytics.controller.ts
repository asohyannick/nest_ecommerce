import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AnalyticsService } from './analytics.service';
import { SalesReportDto } from "./dto/SalesReportDto";
import { UserStatisticsDto } from "./dto/UserStatisticsDto";
import { ProductPerformanceReportDto } from "./dto/ProductPerformanceDto";
import { OrderStatisticsDto } from "./dto/OrderStatisticsDto";
@ApiTags('Analytics and Reporting Endpoints')
@Controller('analytics/reports')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('sales')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Sales report retrieved successfully", type: SalesReportDto })
    async getSalesReport(): Promise<SalesReportDto> {
        return this.analyticsService.getSalesReport();
    }

    @Get('users')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User statistics retrieved successfully", type: UserStatisticsDto })
    async getUserStatistics(): Promise<UserStatisticsDto> {
        return this.analyticsService.getUserStatistics();
    }

    @Get('products')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Product performance report retrieved successfully", type: ProductPerformanceReportDto, isArray: true })
    async getProductPerformanceReport(): Promise<ProductPerformanceReportDto[]> {
        return this.analyticsService.getProductPerformanceReport();
    }

    @Get('orders')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Order statistics retrieved successfully", type: OrderStatisticsDto })
    async getOrderStatistics(): Promise<OrderStatisticsDto> {
        return this.analyticsService.getOrderStatistics();
    }
}