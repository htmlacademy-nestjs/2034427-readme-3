import {Expose, Transform} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '23'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User Email address',
    example: 'user@app.ru'
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
    example: 'Ivan'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'Count created posts',
    example: 5
  })
  @Expose()
  public postCount: number;

  @ApiProperty({
    description: 'Count subscribers',
    example: 2
  })
  @Expose()
  public subscribersCount: number;

  @ApiProperty({
    description: 'Registration date',
    example: '2023-03-23T16:47:37.269Z'
  })
  @Expose()
  public createdAt: string;
}
