import {Transform} from 'class-transformer';
import {IsNumber, IsOptional} from 'class-validator';

export class PaginationQuery {
  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public limit: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page: number;
}
