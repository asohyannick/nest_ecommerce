import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateLoyaltyProgramDto {
    @ApiProperty({ description: 'Name of the loyalty program', example: 'Gold Membership' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Points required for redemption', example: 100 })
    @IsNumber()
    pointsRequired: number;
}