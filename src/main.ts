import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/exception/globalException';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());    
  // Security headers
  app.use(helmet());

  // Compression middleware
  app.use(compression());
    app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }))
    app.useGlobalFilters(new AllExceptionsFilter());
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // API versioning
  const apiVersion = process.env.API_VERSION || 'v1';
  app.setGlobalPrefix(`api/${apiVersion}`);

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('PORT') || 3000;
  const appHost = configService.get<string>('APP_HOST') || 'http://localhost';

  // CORS setup
  const allowedOrigins = (configService.get<string>('FRONTEND_DOMAIN') || 'http://localhost:3000')
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0);

  console.log('CORS allowed origins:', allowedOrigins);
  app.enableCors({
    origin: allowedOrigins,
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce Restful API Documentation developed and maintained with TypeScript, Node.js and Nest.js framework by Asoh Yannick, A Backend Software Engineer.')
    .setDescription('This API documentation provides detailed information about the enterprise solutions such as Authentication and RBAC, Payments, Products, Cart, Orders, Shipment, Logistics and much more used in the application.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`api/${apiVersion}/docs`, app, document);

  // Graceful shutdown
  app.enableShutdownHooks();

  await app.listen(appPort);
  console.log(`🚀 Server running at ${appHost}:${appPort}/api/${apiVersion}`);
  console.log(`📖 Swagger docs: ${appHost}:${appPort}/api/${apiVersion}/docs`);
}

void bootstrap();


