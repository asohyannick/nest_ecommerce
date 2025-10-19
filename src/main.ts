import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  const apiVersion = process.env.API_VERSION || 'v1';
  app.setGlobalPrefix(`api/${apiVersion}`);
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('APP_PORT') || 8000;
  const appHost = configService.get<string>('APP_HOST') || 'http://localhost';
  const allowedOrigins = (configService.get<string>('FRONTEND_DOMAIN') || 'http://localhost:3000')
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0)
  app.enableCors({
    origin: allowedOrigins,
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
   // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('API documentation for the E-commerce project')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT auth in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document); // Swagger UI will be available at /api/docs

  await app.listen(appPort);

  console.log(`🚀 Server is running at ${appHost}:${appPort}/api/${apiVersion}`);
}

void bootstrap();

