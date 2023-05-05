import {ApiProperty} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {
  INVALID_QUOTE_AUTHOR_LENGTH,
  INVALID_QUOTE_LENGTH,
  INVALID_TAG_LENGTH, QUOTE_AUTHOR_MAX_LENGTH, QUOTE_AUTHOR_MIN_LENGTH, QUOTE_MAX_LENGTH,
  QUOTE_MIN_LENGTH, TAG_MAX_LENGTH, TAG_MIN_LENGTH
} from "@project/shared/validation";

export class PostQuoteDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'Text quote',
    required: true
  })
  @IsString()
  @Length(QUOTE_MIN_LENGTH, QUOTE_MAX_LENGTH, {message: INVALID_QUOTE_LENGTH})
  @IsNotEmpty()
  public text: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Keks',
    required: true
  })
  @IsString()
  @Length(QUOTE_AUTHOR_MIN_LENGTH, QUOTE_AUTHOR_MAX_LENGTH, {message: INVALID_QUOTE_AUTHOR_LENGTH})
  @IsNotEmpty()
  public quoteAuthor: string;

  @ApiProperty({
    description: 'Post tags list',
    example: ["foo","bar"],
    required: false,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(TAG_MIN_LENGTH, TAG_MAX_LENGTH, {message: INVALID_TAG_LENGTH, each: true})
  @IsOptional()
  public tags: string[];
}
