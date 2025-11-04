import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGiftCardDto {
    @ApiProperty({ description: 'ID of the user creating the gift card', example: '60d5ec49f3f1f8e3d0a0a1b1' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Value of the gift card', example: 100 })
    @IsNumber()
    value: number;

    @ApiProperty({ description: 'Message for the gift card', example: 'Happy Birthday!' })
    @IsOptional()
    @IsString()
    message?: string;
}