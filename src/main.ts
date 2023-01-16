import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppConfig } from './configuration/contracts/app.config';

/**
 * Implements a hybrid nest application, the default way to create microservices break other configurations
 * A hybrid application is one that both listens for HTTP requests, as well as makes use of connected microservices.
 *
 * @see https://docs.nestjs.com/microservices/basics
 * @see https://docs.nestjs.com/faq/hybrid-application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<AppConfig>('application.listenPort', {
    infer: true,
  });
  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
