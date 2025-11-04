import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth-guard';
import { Roles } from '../../common/decorators/roles.decorators';
import { RolesGuard } from '../../common/guards/role.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';
import { ApiBody, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories Management Endpoints')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('create-category')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new product category" })
  @ApiResponse({ status: 201, description: "Product category has been created successfully!" })
  async createCategory(@Body() body: CreateCategoryDto) {
    const category = await this.categoryService.createProductCategory(body);
    return { success: true, message: "Product Category has been created successfully!", data: category }
  }

  @Get('fetch-categories')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: "Product categories have fetched successfully!" })
  async fetchCategories() {
    const categories = await this.categoryService.fetchProductCategories();
    return { success: "Success", message: "Product categories have been fetched successfully", data: categories }
  }

  @Get('fetch-category/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: "Product category has fetched successfully!" })
  async fetchCategory(@Param('id') id: string) {
    const category = await this.categoryService.fetchProductCategory(id);
    return { success: true, message: "Product category has been fetched successfully", data: category }
  }

  @Put('update-category/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: "Product category has been updated successfully!" })
  async updateProductCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    const category = await this.categoryService.updateProductCategory(id, body);
    return { success: true, message: "Product category has been updated successfully", data: category }
  }

  @Delete('delete-category/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: "Product category has been deleted successfully!" })
  async deleteProductCategory(@Param('id') id: string) {
    const category = await this.categoryService.deleteProductCategory(id);
    return { status: 200, message: "Product category has been deleted successfully!", data: category }
  }
}