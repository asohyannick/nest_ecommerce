import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePaymentDto } from "./dto/paymentDto";
import { RefundPaymentDto } from "./dto/refundPaymentDto";
import { Payment } from "./entity/payment.entity";
import Stripe from 'stripe';
import { PaymentStatus } from "../../common/enum/payment.enum";
import { SupportedCurrencies } from '../../common/enum/currency.enum';

@Injectable()
export class PaymentService {
    private stripe: Stripe;

    constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2025-10-29.clover' });
    }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { userId, orderId, amount, currency, paymentMethodId } = createPaymentDto;

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            currency: SupportedCurrencies[currency],
            payment_method: paymentMethodId,
            confirm: true,
        });

        const payment = new this.paymentModel({
            userId,
            orderId,
            amount,
            currency,
            paymentMethodId,
            status: paymentIntent.status,
        });

        return payment.save();
    }

    async getPayment(id: string): Promise<Payment> {
        const payment = await this.paymentModel.findById(id).exec();
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }

    async getUserPayments(userId: string): Promise<Payment[]> {
        return this.paymentModel.find({ userId }).exec();
    }

    async refundPayment(refundPaymentDto: RefundPaymentDto): Promise<Payment> {
        const { paymentId, amount } = refundPaymentDto;

        const payment = await this.getPayment(paymentId);
        await this.stripe.refunds.create({
            payment_intent: payment.paymentMethodId,
            amount: amount * 100,
        });

        payment.status = PaymentStatus.REFUNDED;
        return payment.save();
    }

    async getPaymentMethods(): Promise<any> {
        const paymentMethods = await this.stripe.paymentMethods.list({
            customer: process.env.STRIPE_CUSTOMER_ID, // Replace with actual customer ID
        });

        return paymentMethods.data;
    }
}