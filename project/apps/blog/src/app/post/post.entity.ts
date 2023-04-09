import {IComment, IPost, ITag} from '@project/shared/app-types';
import {IEntity} from '@project/util/util-types';
import {PostType, PostStatus} from '@prisma/client';

export class PostEntity implements IEntity<PostEntity>, IPost {
  public id: number;
  public postType: PostType;
  public title: string;
  public anons: string;
  public text: string;
  public photo: string;
  public video: string;
  public linkUrl: string;
  public descriptionLink: string;
  public quoteAuthor: string;
  public tags: ITag[];
  public userId: string;
  public isRepost?: boolean;
  public originalId: string;
  public originalAuthor: string;
  public status: PostStatus;
  public likeCount: number;
  public commentCount: number;
  public comments: IComment[];
  public createdAt: Date;
  public publishedAt: Date;

  constructor(post: IPost) {
    this.fillEntity(post);
  }

  public toObject(): PostEntity {
    return {
      ...this,
      tags: this.tags.map(({id}) => ({id})),
      comments: this.comments.map(({ id }) => ({ id }))
    };
  }

  public fillEntity(entity: Partial<IPost>): void {
    Object.assign(this, entity)
    this.tags = [...entity.tags];
    this.isRepost = false;
    this.status = PostStatus.publish;
    this.likeCount = 0;
    this.commentCount = 0;
    this.comments = [];
    this.createdAt = new Date();
    this.publishedAt = new Date();
  }
}
