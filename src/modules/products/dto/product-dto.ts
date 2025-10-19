import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Name of the product' })
  name: string;

  @ApiProperty({ example: 'Latest iPhone model', description: 'Product description' })
  description: string;

  @ApiProperty({ example: 1200, description: 'Product price' })
  price: number;

  @ApiProperty({ example: 10, description: 'Stock quantity' })
  stock: number;

  @ApiProperty({ example: true, description: 'Is featured product?', required: false })
  isFeatured?: boolean;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'], description: 'Product images', required: false })
  images?: string[];

  @ApiProperty({ example: 'Electronics', description: 'Product category', required: false })
  category?: string;
}
