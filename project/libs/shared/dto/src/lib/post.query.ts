import {PaginationQuery} from "./pagination.query";
import {IsEnum, IsIn, IsOptional} from "class-validator";
import {PostStatus, PostType} from "@prisma/client";

export enum SortingType {
  PublishAt = 'publishedAt',
  Likes = 'likeCount',
  Comments = 'commentCount',
}

export class PostQuery extends PaginationQuery{
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
