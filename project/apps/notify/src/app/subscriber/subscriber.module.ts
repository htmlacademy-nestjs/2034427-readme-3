import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/util/util-core';
import {MongooseModule} from '@nestjs/mongoose';
import {SubscriberModel, SubscriberSchema} from './subscriber.model';
import {SubscriberRepository} from './subscriber.repository';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: SubscriberModel.name, schema: SubscriberSchema}]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
  ],
  providers: [SubscriberService, SubscriberRepository],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
