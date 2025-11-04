import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { SubscriptionStatus } from "../../../common/enum/subscription.enum";
export class UpdateSubscriptionDto {
    @ApiProperty({ description: 'Updated status of the subscription', enum: SubscriptionStatus, required: false })
    @IsEnum(SubscriptionStatus)
    status?: SubscriptionStatus;
}