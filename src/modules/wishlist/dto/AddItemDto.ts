import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddItemDto {
  @ApiProperty({ description: 'Item ID to add to the wishlist', example: '60d5ec49f3f1f8e3d0a0a1b2' })
  @IsString()
  itemId: string;

  @ApiProperty({ description: 'Item name', example: 'New Smartphone' })
  @IsString()
  itemName: string;
}