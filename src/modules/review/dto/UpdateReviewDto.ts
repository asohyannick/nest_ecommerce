import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
export class UpdateReviewDto {
  @ApiProperty({ description: 'Updated rating', example: 4, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ description: 'Updated review text', example: 'Good product but could be improved.', required: false })
  @IsOptional()
  @IsString()
  reviewText?: string;
}