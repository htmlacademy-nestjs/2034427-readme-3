import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, Length} from 'class-validator';
import {INVALID_TAG_LENGTH, TAG_MAX_LENGTH, TAG_MIN_LENGTH} from "@project/shared/validation";

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'foo'
  })
  @IsString()
  @Length(TAG_MIN_LENGTH, TAG_MAX_LENGTH, {message: INVALID_TAG_LENGTH})
  @IsNotEmpty()
  public readonly title: string;
}
