import {ApiProperty} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Length, Matches} from 'class-validator';
import {
  INVALID_TAG_LENGTH,
  INVALID_TITLE_LENGTH,
  INVALID_YOUTUBE_URL, TAG_MAX_LENGTH, TAG_MIN_LENGTH, TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH, YOUTUBE_LINK_REGEX
} from "@project/shared/validation";

export class PostVideoDto {
  @ApiProperty({
    description: 'Video title',
    example: 'My video',
    required: true
  })
  @IsString()
  @Length(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, {message: INVALID_TITLE_LENGTH})
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Video url',
    example: 'https://www.youtube.com/watch?v=my-video',
    required: true
  })
  @Matches(YOUTUBE_LINK_REGEX, {message: INVALID_YOUTUBE_URL})
  @IsNotEmpty()
  public video: string;

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
