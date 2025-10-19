import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { DatabaseModule } from './config/databaseConfig/database.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    UserModule,
  ],
})
export class AppModule { }
