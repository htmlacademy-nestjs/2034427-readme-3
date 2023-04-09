import {IEntity} from '@project/util/util-types';
import {ITag} from '@project/shared/app-types';

export class TagEntity implements IEntity<TagEntity>, ITag {
  public id: number;
  public title: string;

  constructor(tag: ITag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: ITag) {
    this.id = entity.id;
    this.title = entity.title;
  }

  toObject(): TagEntity {
    return {...this}
  }
}
