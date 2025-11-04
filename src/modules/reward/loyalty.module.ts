import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoyaltyProgram, LoyaltyProgramSchema } from './entity/loyalty.entity';
import { LoyaltyPoints, LoyaltyPointsSchema } from './entity/loyaltyPoints.entity';
import { LoyaltyController } from './loyal.controller';
import { LoyaltyService } from './loyalty.service';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: LoyaltyProgram.name, schema: LoyaltyProgramSchema },
            { name: LoyaltyPoints.name, schema: LoyaltyPointsSchema },
        ]),
        AuthModule,
    ],
    controllers: [LoyaltyController],
    providers: [LoyaltyService],
    exports: [LoyaltyService],
})
export class LoyaltyModule {}