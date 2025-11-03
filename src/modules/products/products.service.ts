import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, SortOrder } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/product-dto';
import { SearchProductDto } from './dto/search-product';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async searchProducts(query: SearchProductDto) {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      isFeatured,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const filter: FilterQuery<Product> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) filter.category = category;

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    if (isFeatured !== undefined) filter.isFeatured = isFeatured;

    const sortOptions: Record<string, SortOrder> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.productModel
        .find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.productModel.countDocuments(filter).exec(),
    ]);

    return {
      message: 'Products fetched successfully!',
      data: {
        products,
        pagination: {
          total,
          page,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) throw new NotFoundException('Product not found');
    return deletedProduct;
  }
}
