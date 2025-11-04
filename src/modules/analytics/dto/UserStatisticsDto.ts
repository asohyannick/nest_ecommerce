import { ApiProperty } from "@nestjs/swagger";

export class UserStatisticsDto {
    @ApiProperty({ description: 'Total number of users', example: 1500 })
    totalUsers: number;

    @ApiProperty({ description: 'New users this month', example: 100 })
    newUsers: number;

    @ApiProperty({ description: 'Active users', example: 1200 })
    activeUsers: number;
}