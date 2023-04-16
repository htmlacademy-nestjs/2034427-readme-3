import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Good post'
  })
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

  @ApiProperty({
    description: 'User unique identifier',
    example: 12
  })
  @IsNotEmpty()
  @IsString()
  public userId: string;
}
