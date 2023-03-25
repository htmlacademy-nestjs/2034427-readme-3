import {IPost, PostStatus, PostType} from '@project/shared/app-types';

export class PostEntity implements IPost {
  public _id: string;
  public type: PostType;
  public title: string;
  public anons: string;
  public text: string;
  public photo: string;
  public video: string;
  public linkUrl: string;
  public descriptionLink: string;
  public quoteAuthor: string;
  public tags: string[];
  public author: string;
  public isRepost: boolean;
  public originalId: string;
  public originalAuthor: string;
  public status: PostStatus;
  public likeCount: number;
  public commentsCount: number;
  public createdAt: string;
  public publishedAt: string;

  constructor(post: IPost) {
    this.fillEntity(post);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(post: IPost) {
    this._id = post._id;
    this.type = post.type;
    this.title = post.title ?? '';
    this.anons = post.anons ?? '';
    this.text = post.text ?? '';
    this.photo = post.photo ?? '';
    this.video = post.video ?? '';
    this.linkUrl = post.linkUrl ?? '';
    this.descriptionLink = post.descriptionLink ?? '';
    this.quoteAuthor = post.quoteAuthor ?? '';
    this.tags = post.tags ?? [];
    this.author = post.author;
    this.isRepost = post.isRepost;
    this.originalId = post.originalId ?? '';
    this.originalAuthor = post.originalAuthor ?? '';
    this.status = post.status;
    this.likeCount = post.likeCount;
    this.commentsCount = post.commentsCount;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
  }
}
