import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CartItemDto {
    @ApiProperty({ description: 'Product ID', example: '60d5ec49f3f1f8e3d0a0a1b2' })
    @IsString()
    productId: string;

    @ApiProperty({ description: 'Quantity of the product', example: 2 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: 'Price of the product', example: 75.00 })
    @IsNumber()
    price: number;
}