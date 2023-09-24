import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { LoggingExceptionFilter } from './common/filters/logging-exception.filter';
import { LoggerService } from './common/logger/logger.service';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new LoggingExceptionFilter(new LoggerService()));

  const config = new DocumentBuilder()
    .setTitle('CollabHub API')
    .setDescription('The CollabHub API Swagger Documentation')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(3000);
}
bootstrap();
