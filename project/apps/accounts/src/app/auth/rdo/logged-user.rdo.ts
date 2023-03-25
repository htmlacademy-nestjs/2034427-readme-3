import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '23'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User Email address',
    example: 'user@app.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'user@app.ru'
  })
  @Expose()
  public accessToken: string;
}
