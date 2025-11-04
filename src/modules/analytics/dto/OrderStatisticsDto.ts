import { ApiProperty } from "@nestjs/swagger";

export class OrderStatisticsDto {
    @ApiProperty({ description: 'Total orders processed', example: 2000 })
    totalOrders: number;

    @ApiProperty({ description: 'Pending orders', example: 150 })
    pendingOrders: number;

    @ApiProperty({ description: 'Completed orders', example: 1800 })
    completedOrders: number;
}