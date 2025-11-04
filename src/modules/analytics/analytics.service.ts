import { Injectable } from "@nestjs/common";
import { SalesReportDto } from "./dto/SalesReportDto";
import { UserStatisticsDto } from "./dto/UserStatisticsDto";
import { ProductPerformanceReportDto } from "./dto/ProductPerformanceDto";
import { OrderStatisticsDto } from './dto/OrderStatisticsDto';

@Injectable()
export class AnalyticsService {
    async getSalesReport(): Promise<SalesReportDto> {
        // Sample data; replace with actual aggregation logic or database queries
        return {
            totalSales: 10000,
            totalOrders: 200,
            totalProductsSold: 500,
        };
    }

    async getUserStatistics(): Promise<UserStatisticsDto> {
        // Sample data; replace with actual aggregation logic or database queries
        return {
            totalUsers: 1500,
            newUsers: 100,
            activeUsers: 1200,
        };
    }

    async getProductPerformanceReport(): Promise<ProductPerformanceReportDto[]> {
        // Sample data; replace with actual aggregation logic or database queries
        return [
            {
                productId: '60d5ec49f3f1f8e3d0a0a1b2',
                productName: 'Smartphone',
                salesCount: 300,
                totalRevenue: 15000,
            },
            {
                productId: '60d5ec49f3f1f8e3d0a0a1b3',
                productName: 'Laptop',
                salesCount: 150,
                totalRevenue: 25000,
            },
        ];
    }

    async getOrderStatistics(): Promise<OrderStatisticsDto> {
        // Sample data; replace with actual aggregation logic or database queries
        return {
            totalOrders: 2000,
            pendingOrders: 150,
            completedOrders: 1800,
        };
    }
}