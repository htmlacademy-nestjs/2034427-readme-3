import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.ru'
  })
  public email: string;
  @ApiProperty({
    description: 'User password',
    example: '1234567'
  })
  public password: string;
}
