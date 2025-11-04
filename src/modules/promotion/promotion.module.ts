import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { Promotion, PromotionSchema } from './entity/promotion.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Promotion.name, schema: PromotionSchema }]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}