import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePromotionDto {
  @ApiProperty({ description: 'Name of the promotion', example: 'Summer Sale' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the promotion', example: '20% off all summer items!' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Discount percentage', example: 20 })
  @IsNumber()
  discountPercentage: number;

  @ApiProperty({ description: 'Start date of the promotion', example: '2023-06-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'End date of the promotion', example: '2023-06-30' })
  @IsDateString()
  endDate: string;
}

