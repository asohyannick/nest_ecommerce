import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ShippingController } from "./shipping.controller";
import { ShippingService } from './shipping.service';
import { Shipping } from "./entity/shipping.entity";
import { ShippingSchema } from "./entity/shipping.entity";
import { AuthModule } from "../auth/auth.module";
@Module({
    imports: [MongooseModule.forFeature([{ name: Shipping.name, schema: ShippingSchema }]), AuthModule],
    controllers: [ShippingController],
    providers: [ShippingService],
    exports: [ShippingService],
})
export class ShippingModule { }