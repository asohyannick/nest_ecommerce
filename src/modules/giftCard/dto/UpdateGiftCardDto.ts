import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
export class UpdateGiftCardDto {
    @ApiProperty({ description: 'Updated value of the gift card', required: false })
    @IsOptional()
    @IsNumber()
    value?: number;

    @ApiProperty({ description: 'Updated message for the gift card', required: false })
    @IsOptional()
    @IsString()
    message?: string;
}