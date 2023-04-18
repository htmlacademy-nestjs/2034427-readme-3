import {Transform} from 'class-transformer';
import {IsEnum, IsIn, IsNumber, IsOptional, IsString} from 'class-validator';
import {PostType, PostStatus} from '@prisma/client';
import {DEFAULT_POST_COUNT_LIMIT} from '../post.constant';

export enum SortingType {
  PublishAt = 'publishedAt',
  Likes = 'likeCount',
  Comments = 'commentCount',
}

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsString()
  @IsOptional()
  public userId?: string;

  @IsString()
  @IsOptional()
  public tag?: string;

  @IsEnum(PostType)
  @IsOptional()
  public postType?: PostType;

  @IsEnum(SortingType)
  @IsOptional()
  public sort: SortingType = SortingType.PublishAt;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public direction: 'asc' | 'desc' = 'desc';

  @IsEnum(PostStatus)
  @IsOptional()
  public status: PostStatus = PostStatus.publish;
}
