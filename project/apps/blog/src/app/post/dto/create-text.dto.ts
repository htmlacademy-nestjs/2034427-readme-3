import {IsNotEmpty, IsString} from 'class-validator';
import {PostTextDto} from '@project/shared/dto';

export class CreateTextDto extends PostTextDto{
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
