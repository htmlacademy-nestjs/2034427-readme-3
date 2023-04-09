import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {PostRepository} from './post.repository';
import {TagRepository} from '../tag/tag.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, TagRepository],
})
export class PostModule {}
