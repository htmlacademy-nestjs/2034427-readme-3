import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivanov'
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivan'
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '1234567'
  })
  public password: string;
}
