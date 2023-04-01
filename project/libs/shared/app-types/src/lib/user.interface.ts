export interface IUser {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  avatar: string;
  postCount?: number;
  followersCount?: number;
  followingCount?: number;
  followers?: string[];
  following?: string[];
  createdAt?: string;
}
