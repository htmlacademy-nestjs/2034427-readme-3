import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {IToken} from '@project/shared/app-types';
import {TokenModel} from './token.model';
import {TokenEntity} from './token.entity';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(TokenModel.name) private readonly tokenModel: Model<TokenModel>,
  ) {}

  public async create(item: TokenEntity): Promise<IToken> {
    return new this.tokenModel(item).save();
  }

  public async findByTokenId(tokenId: string): Promise<IToken | null> {
    return this.tokenModel
      .findOne({tokenId})
      .exec();
  }

  public async deleteByTokenId(tokenId: string) {
    return this.tokenModel
      .deleteOne({tokenId})
      .exec();
  }

  public async deleteByUserId(userId: string) {
    return this.tokenModel
      .deleteMany({userId})
      .exec();
  }

  public async deleteExpiredTokens() {
    return this.tokenModel
      .deleteMany({expiresIn: {$lt: new Date()}});
  }
}
