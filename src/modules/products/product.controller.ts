import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateProductDto } from './dto/product-dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth-guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/roles.decorators';
import { UserRole } from '../../common/enum/roles.enum';
@ApiTags('Product Management Endpoints')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  // Only ADMIN or SUPER_ADMIN can create products
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBody({ type: CreateProductDto })
  @Post('create-product')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product has been created successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async create(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);
    return { success: true, message: 'Product has been created successfully!', data: product };
  }

  // Any authenticated user can view all products
  @UseGuards(JwtAuthGuard)
  @Get('all-products')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'All products have been retrieved successfully.' })
  async findAll() {
    const products = await this.productService.findAll();
    return { success: true, message: 'Products have been retrieved successfully!', data: products };
  }

  // Any authenticated user can view a single product by ID
  @UseGuards(JwtAuthGuard)
  @Get('fetch-product/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return { success: true, message: 'Product has been retrieved successfully!', data: product };
  }

  @Get('search-products')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search, filter, sort, and paginate products' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term for product name or description' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Maximum price filter' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Field to sort by' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async searchProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const products = await this.productService.searchProducts({
      search,
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page: Number(page),
      limit: Number(limit),
    });
    return { message: 'Products have been fetched successfully!', products };
  }

  // Only ADMIN or SUPER_ADMIN can update products
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBody({ type: CreateProductDto })
  @Put('update-product/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(@Param('id') id: string, @Body() body: CreateProductDto) {
    const product = await this.productService.update(id, body);
    return { message: 'Product has been updated successfully!', product };
  }

  // Only ADMIN or SUPER_ADMIN can delete products
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Delete('delete-product/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(id);
    return { message: 'Product has been deleted successfully!', product };
  }
}
