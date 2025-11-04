import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { SubscriptionStatus } from '../../../common/enum/subscription.enum';

export class CreateSubscriptionDto {
    @ApiProperty({ description: 'ID of the user subscribing', example: '60d5ec49f3f1f8e3d0a0a1b1' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Type of subscription', example: 'premium' })
    @IsString()
    subscriptionType: string;

    @ApiProperty({ description: 'Status of the subscription', enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
    @IsEnum(SubscriptionStatus)
    status?: SubscriptionStatus;
}

