import { ApiProperty } from '@nestjs/swagger';

export class SalesReportDto {
    @ApiProperty({ description: 'Total sales amount', example: 10000 })
    totalSales: number;

    @ApiProperty({ description: 'Total number of orders', example: 200 })
    totalOrders: number;

    @ApiProperty({ description: 'Total number of products sold', example: 500 })
    totalProductsSold: number;
}