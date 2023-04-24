import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ISubscriber} from '@project/shared/app-types';
import {SubscriberModel} from './subscriber.model';
import {SubscriberEntity} from './subscriber.entity';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>,
  ) {}

  public async create(item: SubscriberEntity): Promise<ISubscriber> {
    const newEmailSubscriber = new this.subscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async all(): Promise<ISubscriber[]> {
    return this.subscriberModel.find().exec();
  }
}
