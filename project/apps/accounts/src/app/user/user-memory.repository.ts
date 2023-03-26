import {ICRUDRepository} from '@project/util/util-types';
import {UserEntity} from './user.entity';
import {IUser} from '@project/shared/app-types';
import * as crypto from 'crypto';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserMemoryRepository implements ICRUDRepository<UserEntity, string, IUser> {
  private repository: {[key: string]: IUser} = {};

  public async create(item: UserEntity): Promise<IUser> {
    const entity = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entity._id] = entity;

    return {...entity};
  }

  public async findById(id: string): Promise<IUser> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (!existUser) {
      return null;
    }

    return {...existUser};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: UserEntity): Promise<IUser> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
