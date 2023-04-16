import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {AUTH_USER_EMAIL_NOT_VALID} from "../auth.constant";

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.ru'
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '1234567'
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
