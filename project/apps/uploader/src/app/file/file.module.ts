import { Module } from '@nestjs/common';
import {FileController} from './file.controller';
import {FileService} from './file.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import {ConfigService} from '@nestjs/config';
import {FileSubscriber} from './file.subscriber';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/util/util-core';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        const serveRoot = configService.get<string>('application.serveRoot');
        return [{
          rootPath,
          serveRoot,
          serveStaticOptions: {
            fallthrough: true,
          }
        }]
      }
    }),
  ],
  providers: [FileService],
  controllers: [FileController, FileSubscriber],
})
export class FileModule {}
