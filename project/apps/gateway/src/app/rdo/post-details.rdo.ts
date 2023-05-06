import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IComment} from '@project/shared/app-types';
import {PostRdo} from './post.rdo';
import {CommentRdo} from './comment.rdo';

export class PostDetailsRdo extends PostRdo{
  @ApiProperty({description: 'Is repost', example: false})
  @Expose()
  public isRepost: boolean;

  @ApiProperty({type: [CommentRdo]})
  @Expose()
  public comments: IComment[]
}
