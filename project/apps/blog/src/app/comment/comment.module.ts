import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {CommentRepository} from './comment.repository';
import {PostService} from '../post/post.service';
import {PostRepository} from '../post/post.repository';
import {TagRepository} from '../tag/tag.repository';
import {TagService} from '../tag/tag.service';

@Module({
  providers: [
    CommentService,
    CommentRepository,
    PostService,
    PostRepository,
    TagRepository,
    TagService
  ],
  controllers: [CommentController],
})
export class CommentModule {}
