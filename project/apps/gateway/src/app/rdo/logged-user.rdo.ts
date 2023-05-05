import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '23'
  })
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User Email address',
    example: 'ivan@app.test'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivanov'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'ivan'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'Access token',
    example: 'access-token'
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'refresh-token'
  })
  @Expose()
  public refreshToken: string;
}
