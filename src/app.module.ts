import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { DatabaseModule } from './config/databaseConfig/database.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './modules/profile/profile.module';
import { CategoryModule } from './modules/category/category.module';
import { ShoppingCartModule } from './modules/cart/shoppingCart.module';
import { OrderModule } from './modules/orders/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { ReviewModule } from './modules/review/review.module';
import { PromotionModule } from './modules/promotion/promotion.module';
@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    UserModule,
    ProfileModule,
    CategoryModule,
    ShoppingCartModule,
    OrderModule,
    PaymentModule,
    ShippingModule,
    WishlistModule,
    ReviewModule,
    PromotionModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
  ],
})
export class AppModule { }
