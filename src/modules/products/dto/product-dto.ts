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
  @IsArray({ message: 'Images must be an array of strings' })
  @ArrayNotEmpty({ message: 'Images array cannot be empty', each: false })
  @IsString({ each: true, message: 'Each image must be a string' })
  images?: string[];

  @ApiProperty({
    example: 'Electronics',
    description: 'Product category',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;
}
