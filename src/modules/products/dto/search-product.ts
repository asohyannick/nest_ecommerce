import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean, Min, IsArray } from 'class-validator';

export class SearchProductDto {
    @ApiPropertyOptional({ description: 'Search term for name or description' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: 'Category filter' })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({ description: 'Minimum price' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @ApiPropertyOptional({ description: 'Maximum price' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    maxPrice?: number;

    @ApiPropertyOptional({ description: 'Filter by featured status' })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiPropertyOptional({ description: 'Field to sort by' })
    @IsOptional()
    @IsString()
    sortBy?: string;

    @ApiPropertyOptional({ description: 'Sort order (asc or desc)' })
    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc';

    @ApiPropertyOptional({ description: 'Page number', default: 1 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({ description: 'Results per page', default: 10 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number;

    @ApiPropertyOptional({ description: 'Brand filter' })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiPropertyOptional({ description: 'Filter by average rating' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    minRating?: number;

    @ApiPropertyOptional({ description: 'Filter by number of reviews' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    minReviewCount?: number;

    @ApiPropertyOptional({ description: 'Array of feature filters' })
    @IsOptional()
    @IsArray()
    featureFilters?: string[];

    @ApiPropertyOptional({ description: 'Availability status filter' })
    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}