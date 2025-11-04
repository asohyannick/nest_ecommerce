import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ description: 'User ID associated with the wishlist', example: '60d5ec49f3f1f8e3d0a0a1b1' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Name of the wishlist', example: 'Birthday Wishlist' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the wishlist', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

