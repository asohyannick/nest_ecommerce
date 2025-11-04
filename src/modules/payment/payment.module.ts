import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { Payment, PaymentSchema } from "./entity/payment.entity";
import { AuthModule } from "../auth/auth.module";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
        AuthModule
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService]
})

export class PaymentModule { }