import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '23'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User Email address',
    example: 'user@app.test'
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
    description: 'User avatar',
    example: 'avatar.png'
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'User register date',
    example: '20-12-2012 00:00:00'
  })
  @Expose()
  public createdAt: string;
}
