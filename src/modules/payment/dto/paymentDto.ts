import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { PaymentStatus } from '../../../common/enum/payment.enum';
import { SupportedCurrencies } from '../../../common/enum/currency.enum';
export class CreatePaymentDto {
  @ApiProperty({ description: 'User ID associated with the payment', example: '60d5ec49f3f1f8e3d0a0a1b1' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Order ID associated with the payment', example: '60d5ec49f3f1f8e3d0a0a1b2' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: 'Amount to be paid', example: 150.75 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Currency of the payment', example: 'usd' })
  @IsString()
  @IsEnum(SupportedCurrencies)
  currency: SupportedCurrencies;

  @ApiProperty({ description: 'Payment method ID from Stripe', example: 'pm_card_visa' })
  @IsString()
  paymentMethodId: string;

  @ApiProperty({ description: 'Payment status', example: 'succeeded' })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ description: 'Creation date of the payment', required: false })
  @IsOptional()
  @IsDateString()
  date?: Date;
}



