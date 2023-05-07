import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {INVALID_PASSWORD_LENGTH} from "@project/shared/validation";
import {AuthConstant} from "@project/shared/validation";

export class PasswordChangeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(AuthConstant.PasswordMinLength, AuthConstant.PasswordMaxLength, {message: INVALID_PASSWORD_LENGTH})
  @IsString()
  public newPassword: string;
}
