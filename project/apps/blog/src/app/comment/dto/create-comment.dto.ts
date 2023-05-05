import {IsNotEmpty, IsString} from 'class-validator';
import {CommentCreateDto} from '@project/shared/dto';

export class CreateCommentDto extends CommentCreateDto{
  @IsNotEmpty()
  @IsString()
  public userId: string;
}
