import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {INVALID_PASSWORD_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "@project/shared/validation";

export class PasswordChangeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, {message: INVALID_PASSWORD_LENGTH})
  @IsString()
  public newPassword: string;
}
