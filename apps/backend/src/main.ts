import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule))
    .setGlobalPrefix('api')
    .useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

  const config = new DocumentBuilder()
    .setTitle('Transaction API')
    .setDescription('Wooho!')
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
