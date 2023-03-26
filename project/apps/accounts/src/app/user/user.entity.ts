import {IUser} from '@project/shared/app-types';
import {compare, genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from './user.constant';

export class UserEntity implements IUser {
  public _id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public avatar: string;
  public postCount: number;
  public subscribersCount: number;
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
    this.subscribersCount = user.subscribersCount;
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
}
