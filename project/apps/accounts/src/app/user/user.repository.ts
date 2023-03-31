import {Injectable} from '@nestjs/common';
import {ICRUDRepository} from '@project/util/util-types';
import {IUser} from '@project/shared/app-types';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserEntity} from './user.entity';
import {UserModel} from './user.model';

@Injectable()
export class UserRepository implements ICRUDRepository<UserEntity, string, IUser> {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  public async create(item: UserEntity): Promise<IUser> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({id});
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<IUser> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async getAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
}
