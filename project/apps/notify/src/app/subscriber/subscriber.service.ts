import { Injectable } from '@nestjs/common';
import {SubscriberRepository} from './subscriber.repository';
import {CreateSubscriberDto} from './dto/create-subscriber.dto';
import {SubscriberEntity} from './subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
  ) {}

  public async register(subscriber: CreateSubscriberDto) {
    await this.subscriberRepository.create(new SubscriberEntity(subscriber));
  }
}
