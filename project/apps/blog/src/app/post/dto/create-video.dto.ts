import {IsNotEmpty, IsString} from 'class-validator';
import {PostVideoDto} from '@project/shared/dto';

export class CreateVideoDto extends PostVideoDto{
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
