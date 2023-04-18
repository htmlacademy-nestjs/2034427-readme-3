import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ITokenPayload, IUser } from "@project/shared/app-types";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { AUTH_USER_EXISTS, INVALID_CREDENTIALS } from './auth.constant';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from "../user/user.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register({email, firstname, lastname, password}: CreateUserDto): Promise<IUser> {
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

  public async verifyUser({email, password}: LoginUserDto): Promise<IUser> {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    const userEntity = new UserEntity(existUser);
    const isValidPassword = await userEntity.comparePassword(password);

    if (!isValidPassword) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    return userEntity.toObject();
  }

  public async createToken(user: IUser) {
    const payload: ITokenPayload = {
      sub: user._id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
