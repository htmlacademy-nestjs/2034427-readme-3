import {ITokenPayload, IUser} from '@project/shared/app-types';

export function createJWTPayload(user: IUser): ITokenPayload {
  return {
    sub: user._id,
    email: user.email,
    lastname: user.lastname,
    firstname: user.firstname,
  };
}
