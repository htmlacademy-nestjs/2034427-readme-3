import {Inject, Injectable} from '@nestjs/common';
import {rabbitConfig} from '@project/config/config-accounts';
import {ConfigType} from '@nestjs/config';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {ISubscriber, RabbitRouting} from '@project/shared/app-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY) private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async create(subscriber: ISubscriber) {
    await this.rabbitClient.publish<ISubscriber>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      {...subscriber},
    );
  }
}
