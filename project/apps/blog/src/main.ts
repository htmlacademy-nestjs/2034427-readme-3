import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The Blog service')
    .setDescription('Blog service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = configService.get('application.port');
  await app.listen(port);

  Logger.log(
    `🚀 Blog Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🎯 Current mode: ${configService.get('application.environment')}`
  )
}

bootstrap();
