import {ICRUDRepository} from '@project/util/util-types';
import {PostEntity} from './post.entity';
import {IPost} from '@project/shared/app-types';
import crypto from 'crypto';

export class PostMemoryRepository implements ICRUDRepository<PostEntity, string, IPost> {
  private repository: {[key: string]: IPost} = {};

  public async create(item: PostEntity): Promise<IPost> {
    const entity = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entity._id] = entity;

    return {...entity};
  }

  public async findById(id: string): Promise<IPost> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async getAll(): Promise<IPost[]> {
    return Object.values(this.repository).map((item) => item);
  }

  public async getByUserId(id: string): Promise<IPost[]> {
    return Object.values(this.repository).filter((item) => item.author === id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: PostEntity): Promise<IPost> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
