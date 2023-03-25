import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Good post'
  })
  public text: string;
  @ApiProperty({
    description: 'Post uniq ID',
    example: '1234567'
  })
  public postId: string;
}
