import { ApiProperty } from "@nestjs/swagger";

export class ProductPerformanceReportDto {
    @ApiProperty({ description: 'Product ID', example: '60d5ec49f3f1f8e3d0a0a1b2' })
    productId: string;

    @ApiProperty({ description: 'Product name', example: 'Smartphone' })
    productName: string;

    @ApiProperty({ description: 'Number of sales', example: 300 })
    salesCount: number;

    @ApiProperty({ description: 'Total revenue', example: 15000 })
    totalRevenue: number;
}