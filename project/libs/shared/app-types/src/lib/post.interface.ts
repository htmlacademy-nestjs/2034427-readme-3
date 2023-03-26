import {PostStatus} from './post-status.enum';
import {PostType} from './post-type.enum';

export interface IPost {
  _id?: string;
  type: PostType;
  title?: string;
  anons?: string;
  text?: string;
  photo?: string;
  video?: string;
  linkUrl?: string;
  descriptionLink?: string;
  quoteAuthor?: string;
  tags: string[];
  author: string;
  isRepost: boolean;
  originalId?: string;
  originalAuthor?: string;
  status: PostStatus;
  likeCount: number;
  commentsCount: number;
  createdAt: string;
  publishedAt: string;
}
