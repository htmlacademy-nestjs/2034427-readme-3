export type CreatePostType = {
  title?: string;
  anons?: string;
  text?: string;
  photo?: string;
  video?: string;
  linkUrl?: string;
  descriptionLink?: string;
  quoteAuthor?: string;
  tags?: string[];
  userId: string;
}
