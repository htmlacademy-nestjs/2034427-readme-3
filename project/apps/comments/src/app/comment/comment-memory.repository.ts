import {ICRUDRepository} from '@project/util/util-types';
import {IComment} from '@project/shared/app-types';
import {CommentEntity} from './comment.entity';
import crypto from 'crypto';

export class CommentMemoryRepository implements ICRUDRepository<CommentEntity, string, IComment> {
  private repository: {[key: string]: IComment} = {};

  public async create(item: CommentEntity): Promise<IComment> {
    const entity = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entity._id] = entity;

    return {...entity};
  }

  public async findById(id: string): Promise<IComment> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByPostId(postId: string): Promise<IComment[]> {
    return Object.values(this.repository).filter((it) => it.postId === postId);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: CommentEntity): Promise<IComment> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
