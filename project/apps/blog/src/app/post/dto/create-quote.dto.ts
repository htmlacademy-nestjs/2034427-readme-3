import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsString()
  @IsNotEmpty()
  public quoteAuthor: string;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsString()
  public userId: string;
}
