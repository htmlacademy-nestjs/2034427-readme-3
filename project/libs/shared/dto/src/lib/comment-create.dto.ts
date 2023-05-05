import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';
import {COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, INVALID_COMMENT_LENGTH} from "@project/shared/validation";

export class CommentCreateDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Good post'
  })
  @Length(COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH, {message: INVALID_COMMENT_LENGTH})
  @IsNotEmpty()
  @IsString()
  public message: string;

  @ApiProperty({
    description: 'Post uniq ID',
    example: 12
  })
  @IsNotEmpty()
  @IsNumber()
  public postId: number;
}
