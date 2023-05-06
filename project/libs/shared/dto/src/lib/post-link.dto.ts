import {ApiProperty} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsOptional, IsString, IsUrl, Length, MaxLength} from 'class-validator';
import {
  INVALID_DESC_MAX_LENGTH,
  INVALID_TAG_LENGTH,
  INVALID_URL,
  LINK_DESC_MAX_LENGTH,
  TAG_MAX_LENGTH,
  TAG_MIN_LENGTH
} from "@project/shared/validation";

export class PostLinkDto {
  @ApiProperty({
    description: 'URL Link',
    example: 'http://my-linc.com',
    required: true
  })
  @IsUrl({}, {message: INVALID_URL})
  public linkUrl: string;

  @ApiProperty({
    description: 'Link description',
    example: 'Link for service',
    required: true
  })
  @IsString()
  @MaxLength(LINK_DESC_MAX_LENGTH, {message: INVALID_DESC_MAX_LENGTH})
  @IsOptional()
  public descriptionLink: string;

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
