import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePromotionDto {
  @ApiProperty({ description: 'Updated name of the promotion', example: 'Extended Summer Sale', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Updated description of the promotion', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Updated discount percentage', required: false })
  @IsOptional()
  @IsNumber()
  discountPercentage?: number;

  @ApiProperty({ description: 'Updated start date of the promotion', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Updated end date of the promotion', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}