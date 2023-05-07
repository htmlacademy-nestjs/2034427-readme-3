import {ApiProperty} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {
  INVALID_ANONS_LENGTH,
  INVALID_TAG_LENGTH,
  INVALID_TEXT_LENGTH,
  INVALID_TITLE_LENGTH
} from "@project/shared/validation";
import {PostConstant, TagConstant} from "@project/shared/validation";

export class PostTextDto {
  @ApiProperty({
    description: 'Text post title',
    example: 'My post',
    required: true
  })
  @IsString()
  @Length(PostConstant.TitleMinLength, PostConstant.TitleMaxLength, {message: INVALID_TITLE_LENGTH})
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Anons for post',
    example: 'My anons',
    required: true
  })
  @IsString()
  @Length(PostConstant.AnonsMinLength, PostConstant.AnonsMaxLength, {message: INVALID_ANONS_LENGTH})
  @IsNotEmpty()
  public anons: string;

  @ApiProperty({
    description: 'Text for post',
    example: 'Text my post',
    required: true
  })
  @IsString()
  @Length(PostConstant.TextMinLength, PostConstant.TextMaxLength, {message: INVALID_TEXT_LENGTH})
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
  @Length(TagConstant.MinLength, TagConstant.MaxLength, {message: INVALID_TAG_LENGTH, each: true})
  @IsOptional()
  public tags: string[];
}
