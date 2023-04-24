import { Controller } from '@nestjs/common';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {RabbitRouting} from '@project/shared/app-types';
import {SubscriberService} from './subscriber.service';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify',
  })
  public async registerSubscriber(subscriber) {
    await this.subscriberService.register(subscriber);
  }
}
