import {ApiProperty} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {
  INVALID_QUOTE_AUTHOR_LENGTH,
  INVALID_QUOTE_LENGTH,
  INVALID_TAG_LENGTH
} from "@project/shared/validation";
import {PostConstant, TagConstant} from "@project/shared/validation";

export class PostQuoteDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'Text quote',
    required: true
  })
  @IsString()
  @Length(PostConstant.QuoteMinLength, PostConstant.QuoteMaxLength, {message: INVALID_QUOTE_LENGTH})
  @IsNotEmpty()
  public text: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Keks',
    required: true
  })
  @IsString()
  @Length(PostConstant.QuoteAuthorMinLength, PostConstant.QuoteAuthorMaxLength, {message: INVALID_QUOTE_AUTHOR_LENGTH})
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
  @Length(TagConstant.MinLength, TagConstant.MaxLength, {message: INVALID_TAG_LENGTH, each: true})
  @IsOptional()
  public tags: string[];
}
