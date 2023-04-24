import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/util/util-core';
import {MongooseModule} from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import {NotificationModel, NotificationSchema} from './notification.model';
import {NotificationRepository} from './notification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: NotificationModel.name, schema: NotificationSchema}]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
  ],
  providers: [NotificationService, NotificationRepository],
  controllers: [NotificationController],
})
export class NotificationModule {}
