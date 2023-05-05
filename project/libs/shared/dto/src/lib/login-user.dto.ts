import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {INVALID_EMAIL} from "@project/shared/validation";

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.test'
  })
  @IsEmail({}, {message: INVALID_EMAIL})
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password'
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
