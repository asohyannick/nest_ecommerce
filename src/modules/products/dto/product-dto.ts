import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Name of the product' })
  @IsString({ message: 'Product name must be a string' })
  @MaxLength(100, { message: 'Product name must not exceed 100 characters' })
  name: string;

  @ApiProperty({
    example: 'Latest iPhone model with A17 chip and titanium frame',
    description: 'Product description',
  })
  @IsString({ message: 'Product description must be a string' })
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description: string;

  @ApiProperty({ example: 1200, description: 'Product price' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be at least 0' })
  price: number;

  @ApiProperty({ example: 10, description: 'Stock quantity' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @ApiProperty({
    example: true,
    description: 'Is featured product?',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isFeatured must be a boolean value' })
  isFeatured?: boolean;

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Product images',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Image URLs must be an array of strings' })
  @ArrayNotEmpty({ message: 'Image URLs array cannot be empty', each: false })
  @IsString({ each: true, message: 'Each image URL must be a string' })
  imageURLs?: string[];

  @ApiProperty({
    example: 'Electronics',
    description: 'Product category',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @ApiProperty({
    example: 'Apple',
    description: 'Brand of the product',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Brand must be a string' })
  brand?: string;

  @ApiProperty({
    example: '2023-09-01',
    description: 'Release date of the product',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Release date must be a string' })
  releaseDate?: string;

  @ApiProperty({
    example: ['4G', '5G'],
    description: 'Product features',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Features must be an array of strings' })
  @ArrayNotEmpty({ message: 'Features array cannot be empty', each: false })
  @IsString({ each: true, message: 'Each feature must be a string' })
  features?: string[];

  @ApiProperty({
    example: 4.5,
    description: 'Average rating of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  averageRating?: number;

  @ApiProperty({
    example: 100,
    description: 'Number of reviews for the product',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Review count must be a number' })
  @Min(0, { message: 'Review count cannot be negative' })
  reviewCount?: number;
}