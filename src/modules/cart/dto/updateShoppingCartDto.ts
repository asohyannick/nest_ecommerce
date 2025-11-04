import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsArray,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDateString,
    ArrayNotEmpty,
} from 'class-validator';
import { CartItemDto } from './cartItemDto';
export class UpdateShoppingCartDto {
    @ApiProperty({ description: 'Unique identifier for the shopping cart', example: '60d5ec49f3f1f8e3d0a0a1b1' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'List of items in the cart', type: [String] })
    @IsArray()
    @ArrayNotEmpty({ message: 'Cart must have at least one item' })
    items: CartItemDto[];

    @ApiProperty({ description: 'Total price of all items in the cart', example: 150.75 })
    @IsNumber()
    totalPrice: number;

    @ApiProperty({ description: 'Discount applied to the cart', example: 10, required: false })
    @IsOptional()
    @IsNumber()
    discount?: number;

    @ApiProperty({ description: 'Final price after discount', example: 140.75 })
    @IsNumber()
    finalPrice: number;

    @ApiProperty({ description: 'Indicates if the cart is checked out', example: false })
    @IsBoolean()
    checkedOut: boolean;

    @ApiProperty({ description: 'Date when the cart was created', required: false })
    @IsOptional()
    @IsDateString()
    date?: Date;

    @ApiProperty({ description: 'User notes about the cart', example: 'Gift for a friend', required: false })
    @IsOptional()
    @IsString()
    notes?: string;
}
