import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/util/util-core';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
