import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
export class RedeemLoyaltyPointsDto {
    @ApiProperty({ description: 'ID of the user redeeming points', example: '60d5ec49f3f1f8e3d0a0a1b1' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Number of points to redeem', example: 50 })
    @IsNumber()
    points: number;
}