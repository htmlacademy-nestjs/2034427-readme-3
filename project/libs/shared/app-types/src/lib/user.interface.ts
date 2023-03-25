export interface IUser {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  avatar: string;
  postCount: number;
  subscribersCount: number;
  createdAt: string;
}
