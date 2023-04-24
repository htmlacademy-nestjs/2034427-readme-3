import {IEntity} from '@project/util/util-types';
import {IComment} from '@project/shared/app-types';

export class CommentEntity implements IEntity<CommentEntity>, IComment {
  public id: number;
  public message: string;
  public postId: number;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(entity: Partial<IComment>) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: Partial<IComment>): void {
    Object.assign(this, entity);
  }

  public toObject(): CommentEntity {
    return {...this};
  }
}
