export enum ApplicationServiceURL {
  Auth = 'http://localhost:3000/api/auth',
  Users = 'http://localhost:3000/api/users',
  Posts = 'http://localhost:3001/api/posts',
  Comments = 'http://localhost:3001/api/comments',
  Tags = 'http://localhost:3001/api/tags',
  Uploader = 'http://localhost:3002/api/files',
  Mail = 'http://localhost:3003/api/mail'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
