import {Transform} from "class-transformer";
import {IsNumber, IsOptional} from "class-validator";

const DEFAULT_POST_COUNT_LIMIT = 25;

export class PaginationQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
