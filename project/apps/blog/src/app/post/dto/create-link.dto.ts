import { IsString} from 'class-validator';
import {PostLinkDto} from '@project/shared/dto';

export class CreateLinkDto extends PostLinkDto{
  @IsString()
  public userId: string;
}
