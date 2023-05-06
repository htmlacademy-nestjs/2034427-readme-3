import {ApiProperty} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsOptional, IsString, Length} from 'class-validator';
import {Transform} from 'class-transformer';
import {INVALID_TAG_LENGTH, TAG_MAX_LENGTH, TAG_MIN_LENGTH} from "@project/shared/validation";

export class PostPhotoDto {
  @ApiProperty({type: 'string', format: 'binary', required: false})
  @IsOptional()
  public photo: string;

  @ApiProperty({
    type: [String],
    description: 'Post tags list',
    example: ["foo", "bar"],
    required: false,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(TAG_MIN_LENGTH, TAG_MAX_LENGTH, {message: INVALID_TAG_LENGTH, each: true})
  @Transform(({value}) => value.split(','))
  @IsOptional()
  public tags: string[];
}
