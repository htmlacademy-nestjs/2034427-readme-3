import {Transform} from 'class-transformer';
import {IsNumber, IsOptional} from 'class-validator';

const DEFAULT_COMMENT_COUNT_LIMIT = 50

export class CommentQuery {
  @Transform(({ value } ) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENT_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
