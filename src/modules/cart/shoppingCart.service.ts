import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateShoppingCartDto } from "./dto/createShoppingCartDto";
import { UpdateShoppingCartDto } from "./dto/updateShoppingCartDto";
import { ShoppingCart } from "./entity/shoppingCartEntity";
@Injectable()
export class ShoppingCartService {
    constructor(@InjectModel(ShoppingCart.name) private readonly ShoppingCartModel: Model<ShoppingCart>) { }

    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        const createdCart = new this.ShoppingCartModel(createShoppingCartDto);
        return createdCart.save();
    }

    async findAllShoppingCarts(): Promise<ShoppingCart[]> {
        return this.ShoppingCartModel.find().exec();
    }

    async findOneShoppingCart(id: string): Promise<ShoppingCart> {
        const cart = await this.ShoppingCartModel.findById(id).exec();
        if (!cart) {
            throw new NotFoundException(`Shopping cart with ID ${id} not found`);
        }
        return cart;
    }

    async updateOneShoppingCart(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
        const updatedCart = await this.ShoppingCartModel.findByIdAndUpdate(id, updateShoppingCartDto, { new: true, runValidators: true }).exec();
        if (!updatedCart) {
            throw new NotFoundException(`Shopping cart with ID ${id} not found`);
        }
        return updatedCart;
    }

    async removeOneShoppingCart(id: string): Promise<void> {
        const result = await this.ShoppingCartModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Shopping cart with ID ${id} not found`);
        }
    }

    async addItemToCart(cartId: string, productId: string, quantity: number): Promise<ShoppingCart> {
        const cart = await this.findOneShoppingCart(cartId);
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        // Check if item already exists in cart
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity; // update quantity
        } else {
            cart.items.push({ productId, quantity, price: 0 });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        cart.finalPrice = cart.totalPrice - (cart.discount || 0);

        return cart.save();
    }

    async removeItemFromCart(cartId: string, productId: string): Promise<ShoppingCart> {
        const cart = await this.findOneShoppingCart(cartId);

        cart.items = cart.items.filter(item => item.productId !== productId);

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        cart.finalPrice = cart.totalPrice - (cart.discount || 0);

        return cart.save();
    }

    async clearCart(cartId: string): Promise<ShoppingCart> {
        const cart = await this.findOneShoppingCart(cartId);

        cart.items = []; // Clear the items
        cart.totalPrice = 0;
        cart.finalPrice = 0;

        return cart.save();
    }

}