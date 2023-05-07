import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {IRefreshTokenPayload, IUser} from '@project/shared/app-types';
import { JwtService } from '@nestjs/jwt';
import {jwtConfig} from '@project/config/config-accounts';
import {ConfigType} from '@nestjs/config';
import {createJWTPayload} from '@project/util/util-core';
import * as crypto from 'node:crypto';
import {CreateUserDto, LoginUserDto} from '@project/shared/dto';
import {TokenService} from '../token/token.service';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import {
  AUTH_USER_EXISTS,
  INVALID_CREDENTIALS,
  INVALID_REFRESH_TOKEN,
  TOKEN_NOT_FOUND
} from "@project/shared/validation";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async register({email, firstname, lastname, password, avatar}: CreateUserDto): Promise<IUser> {
    const user = {
      email, firstname, lastname, avatar, passwordHash: '',
      postCount: 0, subscribersCount: 0, createdAt: new Date().toISOString(),
    };

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new BadRequestException(AUTH_USER_EXISTS);
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

  public async verifyRefreshToken(refreshToken: string): Promise<IUser> {
    const payload = await this.getRefreshTokenPayload(refreshToken);
    const existToken = await this.tokenService.isExist(payload.tokenId);

    if (!existToken) {
      throw new NotFoundException(TOKEN_NOT_FOUND);
    }

    await this.tokenService.deleteRefreshSession(payload.tokenId);
    await this.tokenService.deleteExpiredRefreshTokens();

    const user = await this.userRepository.findById(payload.sub);
    return new UserEntity(user);
  }

  public async createToken(user: IUser) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {...accessTokenPayload, tokenId: crypto.randomUUID()};
    await this.tokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    }
  }

  private async getRefreshTokenPayload(refreshToken: string): Promise<IRefreshTokenPayload> {
    try {
      return this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtOptions.refreshTokenSecret,
      });
    } catch (err) {
      throw new BadRequestException(INVALID_REFRESH_TOKEN);
    }
  }
}
