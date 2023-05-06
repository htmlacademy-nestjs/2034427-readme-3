import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {PostType} from '@prisma/client';
import {ITag} from '@project/shared/app-types';
import {UserRdo} from './user.rdo';
import {TagRdo} from './tag.rdo';

export class PostRdo {
  @ApiProperty({description: 'Unique post ID', example: '23'})
  @Expose()
  public postId: number;

  @ApiProperty({description: 'Post type', example: 'video'})
  @Expose()
  public postType: PostType;

  @ApiProperty({description: 'Post title', example: 'my post'})
  @Expose()
  public title: string;

  @ApiProperty({description: 'Post anons', example: 'my anons post'})
  @Expose()
  public anons: string;

  @ApiProperty({description: 'Post content text', example: 'post text'})
  @Expose()
  public text: string;

  @ApiProperty({description: 'Post photo', example: 'image.jpg'})
  @Expose()
  public photo: string;

  @ApiProperty({description: 'URL Video', example: 'http://youtube/video'})
  @Expose()
  public video: string;

  @ApiProperty({description: 'Service link', example: 'http://link.com'})
  @Expose()
  public linkUrl: string;

  @ApiProperty({description: 'Description post link', example: 'my service'})
  @Expose()
  public descriptionLink: string;

  @ApiProperty({description: 'Author quote', example: 'Keks'})
  @Expose()
  public quoteAuthor: string;

  @ApiProperty({description: 'Count likes', example: '25'})
  @Expose()
  public likeCount: number;

  @ApiProperty({description: 'Count comments', example: '5'})
  @Expose()
  public commentCount: number;

  @ApiProperty({type: [TagRdo], isArray: true, description: 'Tag list', example: [{id: 1, title: 'foo'}]})
  @Expose()
  public tags: ITag[];

  @ApiProperty()
  @Expose()
  public author: UserRdo;

  @ApiProperty({description: 'Date post published', example: '2023-03-25T11:09:47.011Z'})
  @Expose()
  public publishedAt: string;
}
