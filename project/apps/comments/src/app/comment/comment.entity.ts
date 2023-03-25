import {IComment} from '@project/shared/app-types';

export class CommentEntity implements IComment {
  public _id: string;
  public text: string;
  public postId: string;
  public author: string;
  public createdAt: string;

  constructor(comment: IComment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: IComment) {
    this._id = comment._id;
    this.text = comment.text;
    this.postId = comment.postId;
    this.author = comment.author;
    this.createdAt = comment.createdAt;
  }
}
