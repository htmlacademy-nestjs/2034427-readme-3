import {Document, SchemaTypes} from 'mongoose';
import {IUser} from '@project/shared/app-types';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements IUser {

  @Prop({required: true, unique: true})
  public email: string;

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public lastname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop()
  public avatar: string;

  @Prop({type: Number, default: 0})
  public postCount: number;

  @Prop({type: Number, default: 0})
  public followersCount: number;

  @Prop({type: Number, default: 0})
  public followingCount: number;

  @Prop([{type: SchemaTypes.ObjectId, ref: UserModel.name, default: []}])
  public followers: string[];

  @Prop([{type: SchemaTypes.ObjectId, ref: UserModel.name, default: []}])
  public following: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
