import {IEntity} from '@project/util/util-types';
import {ISubscriber} from '@project/shared/app-types';

export class SubscriberEntity implements IEntity<SubscriberEntity>, ISubscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;

  constructor(subscriber: Partial<ISubscriber>) {
    this.fillEntity(subscriber);
  }

  public fillEntity(entity) {
    Object.assign(this, entity);
  }

  public toObject(): SubscriberEntity {
    return {...this};
  }
}
