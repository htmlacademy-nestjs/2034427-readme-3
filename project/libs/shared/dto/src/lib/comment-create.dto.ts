import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';
import {INVALID_COMMENT_LENGTH} from "@project/shared/validation";
import {CommentConstant} from "@project/shared/validation";

export class CommentCreateDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Good post'
  })
  @Length(CommentConstant.MinLength, CommentConstant.MaxLength, {message: INVALID_COMMENT_LENGTH})
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
