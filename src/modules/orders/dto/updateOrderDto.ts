import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "../../../common/enum/order.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
  @ApiProperty({ description: 'Updated status of the order', example: 'shipped', required: false })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({ description: 'Updated shipping address', required: false })
  @IsOptional()
  @IsString()
  shippingAddress?: string;
}
