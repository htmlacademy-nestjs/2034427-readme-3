import {Inject, Injectable} from '@nestjs/common';
import {jwtConfig} from '@project/config/config-accounts';
import {IRefreshTokenPayload, IToken} from '@project/shared/app-types';
import {parseTime} from '@project/util/util-core';
import {ConfigType} from '@nestjs/config';
import dayjs from 'dayjs';
import {TokenRepository} from './token.repository';
import {TokenEntity} from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async createRefreshSession(payload: IRefreshTokenPayload): Promise<IToken> {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new TokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate()
    });

    return this.tokenRepository.create(refreshToken);
  }

  public async isExist(tokenId: string): Promise<boolean> {
    const refreshToken = await this.tokenRepository.findByTokenId(tokenId);
    return refreshToken !== null;
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.deleteExpiredRefreshTokens();
    return this.tokenRepository.deleteByTokenId(tokenId);
  }

  public async deleteExpiredRefreshTokens() {
    return this.tokenRepository.deleteExpiredTokens();
  }

  public async deleteByUserId(userId: string) {
    return this.tokenRepository.deleteByUserId(userId);
  }
}
