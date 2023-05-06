import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {UserRdo} from './user.rdo';

export class UserProfileRdo extends UserRdo{
  @ApiProperty({
    description: 'Count created posts',
    example: 5
  })
  @Expose()
  public postCount: number;

  @ApiProperty({
    description: 'Count subscribe',
    example: 2
  })
  @Expose()
  public followersCount: number;

  @ApiProperty({
    description: 'Count subscribers',
    example: 5
  })
  @Expose()
  public followingCount: number;
}
