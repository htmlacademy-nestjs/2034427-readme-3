import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import {CommentController} from './comment.controller';
import {CommentMemoryRepository} from './comment-memory.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentMemoryRepository],
})
export class CommentModule {}
