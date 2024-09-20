import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: '*',
    methods: ['GET', 'POST'],
    origin: [
      'http://localhost:5173',
      process.env.PRODUCTION_FRONTEND_URL ?? '',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Transaction API')
    .setDescription(
      'Details on how to use our transaction API with examples and more',
    )
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
