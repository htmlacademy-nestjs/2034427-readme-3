import {ApiProperty} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {
  ANONS_MAX_LENGTH,
  ANONS_MIN_LENGTH,
  INVALID_ANONS_LENGTH,
  INVALID_TAG_LENGTH,
  INVALID_TEXT_LENGTH,
  INVALID_TITLE_LENGTH,
  TAG_MAX_LENGTH,
  TAG_MIN_LENGTH,
  TEXT_MAX_LENGTH,
  TEXT_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH
} from "@project/shared/validation";

export class PostTextDto {
  @ApiProperty({
    description: 'Text post title',
    example: 'My post',
    required: true
  })
  @IsString()
  @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, {message: INVALID_TITLE_LENGTH})
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Anons for post',
    example: 'My anons',
    required: true
  })
  @IsString()
  @Length(ANONS_MIN_LENGTH, ANONS_MAX_LENGTH, {message: INVALID_ANONS_LENGTH})
  @IsNotEmpty()
  public anons: string;

  @ApiProperty({
    description: 'Text for post',
    example: 'Text my post',
    required: true
  })
  @IsString()
  @Length(TEXT_MIN_LENGTH, TEXT_MAX_LENGTH, {message: INVALID_TEXT_LENGTH})
  @IsNotEmpty()
  public text: string;

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
