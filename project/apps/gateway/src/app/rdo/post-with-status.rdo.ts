import {PostRdo} from "./post.rdo";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {PostStatus} from '@prisma/client';

export class PostWithStatusRdo extends PostRdo {
  @ApiProperty({
    enum: PostStatus
  })
  @Expose()
  status: PostStatus
}
