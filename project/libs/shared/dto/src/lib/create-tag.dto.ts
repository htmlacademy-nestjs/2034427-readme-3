import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, Length} from 'class-validator';
import {INVALID_TAG_LENGTH} from "@project/shared/validation";
import {TagConstant} from "@project/shared/validation";

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'foo'
  })
  @IsString()
  @Length(TagConstant.MaxLength, TagConstant.MaxLength, {message: INVALID_TAG_LENGTH})
  @IsNotEmpty()
  public readonly title: string;
}
