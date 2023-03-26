import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {PostMemoryRepository} from './post-memory.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostMemoryRepository],
})
export class PostModule {}
