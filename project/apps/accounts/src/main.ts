import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The Accounts service')
    .setDescription('Accounts service API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = configService.get('application.port');
  await app.listen(port);

  Logger.log(
    `🚀 Accounts service is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🎯 Current mode: ${configService.get('application.environment')}`
  )
}

bootstrap();
