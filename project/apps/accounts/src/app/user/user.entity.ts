import {IUser} from '@project/shared/app-types';
import {compare, genSalt, hash} from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserEntity implements IUser {
  public _id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public avatar: string;
  public postCount: number;
  public followersCount: number;
  public followingCount: number;
  public followers: string[];
  public following: string[];
  public createdAt: string;

  constructor(user: IUser) {
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: IUser) {
    this._id = user._id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar;
    this.postCount = user.postCount;
    this.followersCount = user.followersCount;
    this.followingCount = user.followingCount;
    this.followers = user.followers ?? [];
    this.following = user.following ?? [];
    this.createdAt = user.createdAt;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public followersIncrement() {
    this.followersCount ++;
  }

  public followersDecrement() {
    this.followersCount --;
  }

  public followingIncrement() {
    this.followingCount ++;
  }

  public followingDecrement() {
    this.followingCount --;
  }

  public postCountIncrement() {
    this.postCount ++;
  }

  public postCountDecrement() {
    this.postCount --;
  }
}
