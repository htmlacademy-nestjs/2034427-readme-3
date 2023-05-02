import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.ru'
  })
  @IsEmail({})
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Ivanov'
  })
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivan'
  })
  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '1234567'
  })
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false})
  @IsOptional()
  public avatar: string;
}
