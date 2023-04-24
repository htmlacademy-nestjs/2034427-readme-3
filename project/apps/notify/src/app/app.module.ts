import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { SubscriberModule } from './subscriber/subscriber.module';
import { NotificationModule } from './notification/notification.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    ConfigNotifyModule,
    SubscriberModule,
    NotificationModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
