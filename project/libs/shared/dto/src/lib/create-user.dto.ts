import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {
  FIRSTNAME_MAX_LENGTH,
  FIRSTNAME_MIN_LENGTH,
  INVALID_EMAIL,
  INVALID_FIRSTNAME_LENGTH,
  INVALID_LASTNAME_LENGTH,
  INVALID_PASSWORD_LENGTH,
  LASTNAME_MAX_LENGTH,
  LASTNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH
} from "@project/shared/validation";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.test'
  })
  @IsEmail({}, {message: INVALID_EMAIL})
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Firstname'
  })
  @IsString()
  @Length(FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH, {message: INVALID_FIRSTNAME_LENGTH})
  @IsNotEmpty()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Lastname'
  })
  @IsString()
  @Length(LASTNAME_MIN_LENGTH, LASTNAME_MAX_LENGTH, {message: INVALID_LASTNAME_LENGTH})
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: 'password'
  })
  @IsString()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, {message: INVALID_PASSWORD_LENGTH})
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false})
  @IsOptional()
  public avatar: string;
}
