import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateReviewDto } from "./dto/CreateReviewDto";
import { UpdateReviewDto } from "./dto/UpdateReviewDto";
import { ReviewService } from './review.service';
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";

@ApiTags('Review Management Endpoints')
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Post('submit-review')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "Review created successfully" })
    async createReview(@Body() createReviewDto: CreateReviewDto) {
        const review = await this.reviewService.createReview(createReviewDto);
        return { success: true, message: "Review created successfully", data: review };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('all-reviews')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Reviews retrieved successfully" })
    async getAllReviews() {
        const reviews = await this.reviewService.getAllReviews();
        return { success: true, message: "Reviews retrieved successfully", data: reviews };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Get('fetch-review/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Review retrieved successfully" })
    async getReview(@Param('id') id: string) {
        const review = await this.reviewService.getReview(id);
        return { success: true, message: "Review retrieved successfully", data: review };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Put('update-review/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Review updated successfully" })
    async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        const review = await this.reviewService.updateReview(id, updateReviewDto);
        return { success: true, message: "Review updated successfully", data: review };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CUSTOMER)
    @Delete('delete-review/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Review deleted successfully" })
    async deleteReview(@Param('id') id: string) {
        await this.reviewService.deleteReview(id);
        return { success: true, message: "Review deleted successfully" };
    }
}