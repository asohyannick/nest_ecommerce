import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    MaxLength,
    IsArray,
    IsBoolean,
} from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Unique identifier for the category', example: 'electronics' })
    @IsString()
    @MaxLength(100)
    id: string;

    @ApiProperty({ description: 'Name of the category', example: 'Electronics' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ description: 'Description of the category', example: 'Devices and gadgets', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiProperty({ description: 'List of subcategory IDs', required: false })
    @IsOptional()
    @IsArray()
    subCategories?: string[];

    @ApiProperty({ description: 'Status of the category', example: 'active', required: false })
    @IsOptional()
    @IsString()
    status?: 'active' | 'inactive';

    @ApiProperty({ description: 'Indicates if the category is featured', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiProperty({ description: 'Display order of the category', example: 1, required: false })
    @IsOptional()
    @IsString()
    displayOrder?: number;

    @ApiProperty({ description: 'Creation date of the category', required: false })
    @IsOptional()
    @IsString()
    date?: Date;
}