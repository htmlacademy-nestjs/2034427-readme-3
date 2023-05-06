import {IsNotEmpty, IsString} from 'class-validator';

export class SearchQuery {
  @IsString()
  @IsNotEmpty()
  public query: string;
}
