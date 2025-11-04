import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { Payment, PaymentSchema } from "./entity/payment.entity";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService]
})

export class PaymentModule { }