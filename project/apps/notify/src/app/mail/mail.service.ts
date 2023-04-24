import { Injectable } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {SubscriberRepository} from '../subscriber/subscriber.repository';
import {NotificationRepository} from '../notification/notification.repository';
import {Mail, URL_TO_POSTS} from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly subscriberRepository: SubscriberRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  public async sendNotify(): Promise<void> {
    const subscribers = await this.subscriberRepository.all();
    const notifyPosts = await this.notificationRepository.all();

    if (!notifyPosts.length) {
      return;
    }

    await this.mailerService.sendMail({
      to: subscribers.map((item) => item.email),
      subject: Mail.Subject,
      template: Mail.Template,
      context: {
        publish: notifyPosts.map((item) => ({
          url: `${URL_TO_POSTS}/${item.postId}`,
          postType: item.postType,
          title: item.title ?? ''
        })),
      }
    });

    const notifyIds = notifyPosts.map((item) => item._id);
    await this.notificationRepository.deleteByIds(notifyIds);
  }
}
