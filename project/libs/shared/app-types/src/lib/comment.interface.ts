export interface IComment {
  id?: number;
  message: string;
  postId?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
