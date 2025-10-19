import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { connect } from 'mongoose';
const logger = new Logger('MongoDB');
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoURL = configService.get<string>('MONGODB_URI_STRING');
        if (!mongoURL) {
          logger.error('MONGODB_URI_STRING is undefined!');
          process.exit(1);
        }
        try {
          await connect(mongoURL);
          logger.log('✅ MongoDB connected successfully');
          return { uri: mongoURL };
        } catch (error) {
          logger.error('❌ MongoDB connection failed:', error.message);
          process.exit(1);
        }
      },
    }),
  ],
})
export class DatabaseModule {}
