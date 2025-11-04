import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID of the user who made the review', example: '60d5ec49f3f1f8e3d0a0a1b1' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'ID of the product being reviewed', example: '60d5ec49f3f1f8e3d0a0a1b2' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Rating given by the user', example: 5 })
  @IsNumber()
  rating: number;

  @ApiProperty({ description: 'Text of the review', example: 'Great product!' })
  @IsOptional()
  @IsString()
  reviewText?: string;
}

