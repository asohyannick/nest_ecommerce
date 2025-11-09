import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Faq } from './entity/faq.entity';
import { FaqService } from "./faq.service";
import { CreateFaqDto } from "./dto/CreateFaqDto";
import { UpdateFaqDto } from "./dto/UpdateFaqDto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth-guard";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorators";
import { UserRole } from "../../common/enum/roles.enum";
@ApiTags('FAQs and Help Center Endpoints')
@Controller('faqs')
export class FaqController {
    constructor(private readonly faqService: FaqService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @Post('create-faq')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: "FAQ created successfully", type: Faq })
    async createFaq(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
        return this.faqService.createFaq(createFaqDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @Get('all-faqs')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "All FAQs retrieved successfully", type: [Faq] })
    async getAllFaqs(): Promise<Faq[]> {
        return this.faqService.getAllFaqs();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @Get('fetch-faq/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "FAQ retrieved successfully", type: Faq })
    async getFaqById(@Param('id') id: string): Promise<Faq> {
        return this.faqService.getFaqById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @Put('update-faq/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "FAQ updated successfully", type: Faq })
    async updateFaq(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto): Promise<Faq> {
        return this.faqService.updateFaq(id, updateFaqDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CUSTOMER)
    @Delete('delete-faq/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "FAQ deleted successfully", type: Faq })
    async deleteFaq(@Param('id') id: string): Promise<Faq> {
        return this.faqService.deleteFaq(id);
    }
}