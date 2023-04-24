import {IEntity} from "@project/util/util-types";
import {INotifyPost} from "@project/shared/app-types";
import {PostType} from '@prisma/client';

export class NotificationEntity implements IEntity<NotificationEntity>, INotifyPost {
  public id: string;
  public postId: number;
  public title: string;
  public postType: PostType;
  public userId: string;

  constructor(notify: Partial<INotifyPost>) {
    this.fillEntity(notify);
  }

  public fillEntity(entity) {
    Object.assign(this, entity);
  }

  public toObject(): NotificationEntity {
    return {...this};
  }
}
