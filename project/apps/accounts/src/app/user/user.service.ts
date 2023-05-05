import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {IUser} from '@project/shared/app-types';
import {UserRepository} from './user.repository';
import {CAN_BE_EQUAL, INVALID_OLD_PASSWORD, USER_NOT_FOUND} from './user.constant';
import {UserEntity} from './user.entity';
import {ChangePasswordDto} from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async follow(id: string, currentUserId: string): Promise<IUser> {
    if (currentUserId === id) {
      throw new BadRequestException(CAN_BE_EQUAL);
    }

    const currentUserEntity = await this.getUser(currentUserId);
    const userEntity = await this.getUser(id);

    if (userEntity.following.includes(currentUserId)) {
      const followingIndex = userEntity.following.indexOf(currentUserEntity._id);
      const followerIndex = currentUserEntity.followers.indexOf(userEntity._id);

      userEntity.following.splice(followingIndex, 1);
      currentUserEntity.followers.splice(followerIndex, 1);
      userEntity.followingDecrement();
      currentUserEntity.followersDecrement();

      await this.userRepository.update(id, userEntity);
      await this.userRepository.update(currentUserId, currentUserEntity);
      return userEntity;
    }

    userEntity.following.push(currentUserEntity._id);
    currentUserEntity.followers.push(userEntity._id);
    userEntity.followingIncrement();
    currentUserEntity.followersIncrement();

    await this.userRepository.update(id, userEntity);
    await this.userRepository.update(currentUserId, currentUserEntity);
    return userEntity;
  }

  public async getUser(id: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(USER_NOT_FOUND)
    }
    return new UserEntity(existUser);
  }

  public async findByIds(userIds: string[]) {
    return this.userRepository.findByIds(userIds);
  }

  public async getAll(): Promise<IUser[]> {
    return this.userRepository.getAll();
  }

  public async getFeedUsers(userId: string) {
    const currentUser = await this.getUser(userId);
    const subscribe = currentUser.followers
    subscribe.push(currentUser._id);
    return this.findByIds(subscribe);
  }

  public async changePassword(changePasswordDto: ChangePasswordDto) {
    const existUser = await this.getUser(changePasswordDto.userId);
    const userEntity = new UserEntity(existUser);
    const isValidOldPassword = await userEntity.comparePassword(changePasswordDto.oldPassword);

    if (!isValidOldPassword) {
      throw new BadRequestException(INVALID_OLD_PASSWORD);
    }

    await userEntity.setPassword(changePasswordDto.newPassword);
    return this.userRepository.update(changePasswordDto.userId, userEntity);
  }

  public async incPostCount(userId: string) {
    const user = await this.getUser(userId);
    user.postCountIncrement();
    await this.userRepository.update(userId, user);
  }

  public async decPostCount(userId: string) {
    const user = await this.getUser(userId);
    user.postCountDecrement();
    await this.userRepository.update(userId, user);
  }
}
