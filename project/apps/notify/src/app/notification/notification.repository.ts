import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {INotifyPost} from '@project/shared/app-types';
import {NotificationModel} from './notification.model';
import {NotificationEntity} from './notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(NotificationModel.name) private readonly notifyModel: Model<NotificationModel>,
  ) {}

  public async create(notify: NotificationEntity): Promise<INotifyPost> {
    const notifyPost = new this.notifyModel(notify);
    return notifyPost.save();
  }

  public async getByUserId(userId: string): Promise<INotifyPost[]> {
    return this.notifyModel.find({userId})
      .exec();
  }

  public async findByPostId(postId: number): Promise<INotifyPost | null> {
    return this.notifyModel
      .findOne({ postId })
      .exec();
  }

  public async deleteByIds(ids: string[]) {
    await this.notifyModel.deleteMany({
      _id: {$in: ids}
    })
  }
}
