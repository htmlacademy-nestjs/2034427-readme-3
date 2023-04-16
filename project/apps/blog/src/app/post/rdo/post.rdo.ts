import {IComment, ITag} from '@project/shared/app-types';
import {PostType, PostStatus} from '@prisma/client';
import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

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

  @ApiProperty({description: 'Post author ID', example: '5'})
  @Expose()
  public userId: string;

  @ApiProperty({description: 'Is repost', example: false})
  @Expose()
  public isRepost: boolean;

  @ApiProperty({description: 'ID original post', example: '2'})
  @Expose()
  public originalId: string;

  @ApiProperty({description: 'Author ID original post', example: '3'})
  @Expose()
  public originalAuthor: string;

  @ApiProperty({description: 'Post publish/draft', example: 'publish'})
  @Expose()
  public status: PostStatus;

  @ApiProperty({description: 'Count likes', example: '25'})
  @Expose()
  public likeCount: number;

  @ApiProperty({description: 'Count comments', example: '5'})
  @Expose()
  public commentCount: number;

  @ApiProperty({description: 'Tag list', example: [{id: 1, title: 'foo'}]})
  @Expose()
  public tags: ITag[];

  @ApiProperty({description: 'Comment list', example: []})
  @Expose()
  comments: IComment[];

  @ApiProperty({description: 'Date post published', example: '2023-03-25T11:09:47.011Z'})
  @Expose()
  public publishedAt: string;
}
