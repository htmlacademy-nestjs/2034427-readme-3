import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserMemoryRepository} from "../user/user-memory.repository";
import {CreateUserDto} from "./dto/create-user.dto";
import {AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from './auth.constant';
import {UserEntity} from '../user/user.entity';
import {LoginUserDto} from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserMemoryRepository) {}

  public async register({email, firstname, lastname, password}: CreateUserDto) {
    const user = {
      email, firstname, lastname, avatar: '', passwordHash: '',
      postCount: 0, subscribersCount: 0, createdAt: new Date().toISOString(),
    };

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password);

    return this.userRepository.create(userEntity);
  }

  public async verifyUser({email, password}: LoginUserDto) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    const isValidPassword = await userEntity.comparePassword(password);

    if (!isValidPassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
