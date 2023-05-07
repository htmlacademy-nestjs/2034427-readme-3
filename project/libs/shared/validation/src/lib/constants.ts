export const YOUTUBE_LINK_REGEX = /^(https?:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
export const TAG_REGEXP = /^[a-zA-Z][(\w)-]+?$/;

export enum CommentConstant {
  MinLength = 10,
  MaxLength = 300,
  DefaultCount = 50,
}

export enum TagConstant {
  MinLength = 3,
  MaxLength = 10,
  MaxCount = 8,
}

export enum AuthConstant {
  FirstNameMinLength = 3,
  FirstNameMaxLength = 50,
  LastNameMinLength = 3,
  LastNameMaxLength = 50,
  PasswordMinLength = 6,
  PasswordMaxLength = 12,
}

export enum PostConstant {
  TitleMinLength = 20,
  TitleMaxLength = 50,
  AnonsMinLength = 50,
  AnonsMaxLength = 255,
  TextMinLength = 100,
  TextMaxLength = 1024,
  LinkDescMaxLength = 300,
  QuoteMinLength = 20,
  QuoteMaxLength = 300,
  QuoteAuthorMinLength = 3,
  QuoteAuthorMaxLength = 3,
  DefaultCount = 25,
  DefaultSearchCount = 20,
  DefaultCommentCount = 5,
}

