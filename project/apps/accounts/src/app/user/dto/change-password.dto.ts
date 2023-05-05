import {IsNotEmpty, IsString} from "class-validator";
import {PasswordChangeDto} from "@project/shared/dto";

export class ChangePasswordDto extends PasswordChangeDto{
  @IsNotEmpty()
  @IsString()
  public userId: string;
}
