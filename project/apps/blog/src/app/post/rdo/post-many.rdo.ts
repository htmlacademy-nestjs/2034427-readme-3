import {IPost} from "@project/shared/app-types";
import {ApiProperty} from "@nestjs/swagger";
import {PostRdo} from "./post.rdo";

export class PostManyRdo {
  @ApiProperty({
    type: [PostRdo],
    description: 'Posts list',
    example: PostRdo
  })
  posts: IPost[];

  @ApiProperty({
    description: 'Post total count',
    example: 5
  })
  totalCount: number;
}
