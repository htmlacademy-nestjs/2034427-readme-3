import {PostType} from '@prisma/client';

export class CreateNotificationDto {
  public postId: number;
  public postType: PostType;
  public title: string;
  public userId: string;
}
