import {ITag} from './tag.interface';
import {IComment} from './comment.interface';
import {PostType, PostStatus} from '@prisma/client';

export interface IPost {
  postId?: number;
  postType: PostType;
  title?: string;
  anons?: string;
  text?: string;
  photo?: string;
  video?: string;
  linkUrl?: string;
  descriptionLink?: string;
  quoteAuthor?: string;
  tags: ITag[];
  userId: string;
  isRepost?: boolean;
  originalId?: number;
  originalAuthor?: string;
  status?: PostStatus;
  likeCount?: number;
  commentCount?: number;
  createdAt?: Date;
  publishedAt?: Date;
  comments?: IComment[];
}
