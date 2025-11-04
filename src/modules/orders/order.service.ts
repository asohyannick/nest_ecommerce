import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderDto } from "./dto/orderDto";
import { Order } from "./entity/order.entity";
import { OrderStatus } from "../../common/enum/order.enum";
import { UpdateOrderDto } from './dto/updateOrderDto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) { }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const order = new this.orderModel(createOrderDto);
        return order.save();
    }

    async getOrder(id: string): Promise<Order> {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async getUserOrders(userId: string): Promise<Order[]> {
        return this.orderModel.find({ userId }).exec();
    }

    async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true, runValidators: true }).exec();
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async deleteOrder(id: string): Promise<void> {
        const result = await this.orderModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
    }

    async cancelOrder(id: string): Promise<Order> {
        const order = await this.getOrder(id);
        order.status = OrderStatus.CANCELED;
        return order.save();
    }

    async payOrder(id: string): Promise<Order> {
        const order = await this.getOrder(id);
        order.status = OrderStatus.PENDING;
        return order.save();
    }

    async getTrackingInfo(id: string): Promise<any> {
        const order = await this.getOrder(id);
        return { trackingId: '123456', status: order.status };
    }

    async returnOrder(id: string): Promise<Order> {
        const order = await this.getOrder(id);
        order.status = OrderStatus.RETURNED;
        return order.save();
    }
}