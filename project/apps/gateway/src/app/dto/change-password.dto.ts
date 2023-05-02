import {ApiProperty} from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty()
  public oldPassword: string;
  @ApiProperty()
  public newPassword: string;
}
