import {IEntity} from '@project/util/util-types';
import {IToken} from '@project/shared/app-types';

export class TokenEntity implements IEntity<TokenEntity>, IToken {
  public id: string;
  public tokenId: string;
  public userId: string;
  public createdAt: Date;
  public expiresIn: Date;

  constructor(refreshToken: IToken) {
    this.createdAt = new Date;
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity) {
    Object.assign(this, entity);
  }

  public toObject(): TokenEntity {
    return { ...this };
  }
}
