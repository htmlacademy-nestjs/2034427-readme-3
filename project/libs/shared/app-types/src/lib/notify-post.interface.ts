import {PostType} from '@prisma/client';

export interface INotifyPost {
  _id?: string;
  postId: number;
  postType: PostType;
  title: string;
  userId: string;
}
