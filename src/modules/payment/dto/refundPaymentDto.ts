import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { SupportedCurrencies } from "../../../common/enum/currency.enum";
export class RefundPaymentDto {
    @ApiProperty({ description: 'Payment ID to be refunded', example: '60d5ec49f3f1f8e3d0a0a1b3' })
    @IsString()
    paymentId: string;

    @ApiProperty({ description: 'Amount to be refunded', example: 150.75 })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Currency of the payment', example: 'usd' })
    @IsString()
    @IsEnum(SupportedCurrencies)
    currency: SupportedCurrencies;
}