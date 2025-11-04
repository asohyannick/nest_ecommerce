import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { OrderStatus } from '../../../common/enum/order.enum';
import { OrderItemDto } from './orderItemDto';
export class CreateOrderDto {
  @ApiProperty({ description: 'User ID associated with the order', example: '60d5ec49f3f1f8e3d0a0a1b1' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'List of ordered items', type: [OrderItemDto] })
  @IsArray()
  items: OrderItemDto[];

  @ApiProperty({ description: 'Total price of the order', example: 150.75 })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: 'Shipping address for the order', example: '123 Main St, City, Country' })
  @IsString()
  shippingAddress: string;

  @ApiProperty({ description: 'Order status', example: 'pending' })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ description: 'Payment method', example: 'credit_card' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ description: 'Creation date of the order', required: false })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;
}




