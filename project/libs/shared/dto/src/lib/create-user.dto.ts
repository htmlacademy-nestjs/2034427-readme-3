import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {
  INVALID_EMAIL,
  INVALID_FIRSTNAME_LENGTH,
  INVALID_LASTNAME_LENGTH,
  INVALID_PASSWORD_LENGTH
} from "@project/shared/validation";
import {AuthConstant} from "@project/shared/validation";

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
  @Length(AuthConstant.FirstNameMinLength, AuthConstant.FirstNameMaxLength, {message: INVALID_FIRSTNAME_LENGTH})
  @IsNotEmpty()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Lastname'
  })
  @IsString()
  @Length(AuthConstant.LastNameMinLength, AuthConstant.LastNameMaxLength, {message: INVALID_LASTNAME_LENGTH})
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: 'password'
  })
  @IsString()
  @Length(AuthConstant.PasswordMinLength, AuthConstant.PasswordMaxLength, {message: INVALID_PASSWORD_LENGTH})
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false})
  @IsOptional()
  public avatar: string;
}
