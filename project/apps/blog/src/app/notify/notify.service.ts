import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {blogConfig} from '@project/config/config-blog';
import {ConfigType} from '@nestjs/config';
import {IPost, RabbitRouting} from '@project/shared/app-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(blogConfig.KEY) private readonly rabbiOptions: ConfigType<typeof blogConfig>,
  ) {}

  public async register(post: IPost) {
    const {postId, userId, title, postType} = post;
    return this.rabbitClient.publish(
      this.rabbiOptions.rabbit.exchange,
      RabbitRouting.AddNotify,
      {postId, userId, title, postType}
    )
  }
}
