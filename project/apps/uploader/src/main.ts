import {Logger} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {ConfigService} from '@nestjs/config';
import { AppModule } from './app/app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = config.get('application.port');
  await app.listen(port);

  Logger.log(
    `🚀 Uploader service is running on: http://localhost:${port}/${globalPrefix}`
  );

  Logger.log(
    `🎯 Current mode: ${config.get('application.environment')}`
  )
}

bootstrap();
