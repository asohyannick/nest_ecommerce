import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { DatabaseModule } from './config/databaseConfig/database.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
  ],
})
export class AppModule { }
