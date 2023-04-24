import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import {MailerModule} from '@nestjs-modules/mailer';
import {getMailerAsyncOptions} from '@project/util/util-core';
import {SubscriberModel, SubscriberSchema} from '../subscriber/subscriber.model';
import {NotificationModel, NotificationSchema} from '../notification/notification.model';
import {SubscriberRepository} from '../subscriber/subscriber.repository';
import {NotificationRepository} from '../notification/notification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: SubscriberModel.name, schema: SubscriberSchema},
      {name: NotificationModel.name, schema: NotificationSchema},
    ]),
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail')),
  ],
  providers: [
    MailService,
    SubscriberRepository,
    NotificationRepository
  ],
  controllers: [MailController],
})
export class MailModule {}
