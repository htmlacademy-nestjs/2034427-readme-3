import { Injectable } from '@nestjs/common';
import {NotificationRepository} from './notification.repository';
import {CreateNotificationDto} from './dto/create-notification.dto';
import {NotificationEntity} from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notifyRepository: NotificationRepository,
  ) {}

  public async register(notify: CreateNotificationDto) {
    const existPost = await this.notifyRepository.findByPostId(notify.postId);
    if (!existPost) {
      await this.notifyRepository.create(
        new NotificationEntity(notify)
      );
    }
  }
}
