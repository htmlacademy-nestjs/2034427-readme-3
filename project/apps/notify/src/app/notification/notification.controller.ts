import { Controller } from '@nestjs/common';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {RabbitRouting} from '@project/shared/app-types';
import {NotificationService} from './notification.service';
import {CreateNotificationDto} from './dto/create-notification.dto';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddNotify,
    queue: 'readme.notify.post',
  })
  public async addNotify(notify: CreateNotificationDto) {
    await this.notificationService.register(notify);
  }
}
