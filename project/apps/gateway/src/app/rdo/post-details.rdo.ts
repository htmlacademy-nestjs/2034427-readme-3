import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {PostRdo} from './post.rdo';

export class PostDetailsRdo extends PostRdo{
  @ApiProperty({description: 'Is repost', example: false})
  @Expose()
  public isRepost: boolean;

  @ApiProperty({description: 'ID original post', example: '2'})
  @Expose()
  public originalId: string;

  @ApiProperty({description: 'Author ID original post', example: '3'})
  @Expose()
  public originalAuthor: string;
}
