import {AuthConstant, CommentConstant, PostConstant, TagConstant} from "./constants";

export const INVALID_EMAIL = 'Invalid email address';
export const INVALID_FIRSTNAME_LENGTH = `Firstname minimum field length: ${AuthConstant.FirstNameMinLength}, maximum ${AuthConstant.FirstNameMaxLength} characters`;
export const INVALID_LASTNAME_LENGTH = `Lastname minimum field length: ${AuthConstant.LastNameMinLength}, maximum ${AuthConstant.LastNameMaxLength} characters`;
export const INVALID_PASSWORD_LENGTH = `Password minimum field length: ${AuthConstant.PasswordMinLength}, maximum ${AuthConstant.PasswordMaxLength} characters`;
export const INVALID_COMMENT_LENGTH = `Anons minimum field length: ${CommentConstant.MinLength}, maximum ${CommentConstant.MaxLength} characters`;
export const INVALID_YOUTUBE_URL = 'Invalid youtube url address';
export const INVALID_TAG_LENGTH = `Tag minimum field length: ${TagConstant.MinLength}, maximum ${TagConstant.MaxLength} characters`;
export const INVALID_TITLE_LENGTH = `Title minimum field length: ${PostConstant.TitleMinLength}, maximum ${PostConstant.TitleMaxLength} characters`;
export const INVALID_ANONS_LENGTH = `Anons minimum field length: ${PostConstant.AnonsMinLength}, maximum ${PostConstant.AnonsMaxLength} characters`;
export const INVALID_TEXT_LENGTH = `Anons minimum field length: ${PostConstant.TextMinLength}, maximum ${PostConstant.TextMaxLength} characters`;
export const INVALID_URL = 'Invalid url link';
export const INVALID_DESC_MAX_LENGTH = `Description length maximum ${PostConstant.LinkDescMaxLength} characters`;
export const INVALID_QUOTE_LENGTH = `Quote minimum field length: ${PostConstant.QuoteMinLength}, maximum ${PostConstant.QuoteMaxLength} characters`;
export const INVALID_QUOTE_AUTHOR_LENGTH = `Quote author minimum field length: ${PostConstant.QuoteAuthorMinLength}, maximum ${PostConstant.QuoteAuthorMaxLength} characters`;

export const AUTH_USER_EXISTS = 'User with this email exists';
export const INVALID_CREDENTIALS = 'Invalid Email and/or Password';
export const TOKEN_NOT_FOUND = 'Refresh token not found';
export const INVALID_REFRESH_TOKEN = 'Invalid refresh token';

export const USER_NOT_FOUND = 'User not found';
export const CAN_BE_EQUAL = 'Follover and folloving can be equal';
export const INVALID_OLD_PASSWORD = 'Invalid old password';

export const COMMENT_NOT_FOUND = 'Comment not found';
export const YOUR_POST = 'Can\'t comment on your post';
export const NOT_COMMENT_AUTHOR = 'You not author is this comment'
export const POST_NOT_FOUND = 'Post not found';
export const NO_POST_AUTHOR = 'You not author is this post';
export const IS_POST_AUTHOR = 'You author of this post';
export const IS_POST_REPOST = 'This is repost';
export const EXIST_REPOST = 'Repost already created';
export const INVALID_POST_TYPE = 'Invalid post type';
export const TAG_NOT_FOUND = 'Tag not found';
export const TAG_NOT_EMPTY = 'Tag is not empty';
export const MAX_COUNT_TAGS_ERROR = `Tags cannot be more 8`
export const INCORRECT_TAG = 'tag must contain only (a-z, 0-9, -, _), first character must be a letter';
