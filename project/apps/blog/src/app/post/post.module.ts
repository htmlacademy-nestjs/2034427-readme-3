import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {PostRepository} from './post.repository';
import {TagService} from '../tag/tag.service';
import {NotifyModule} from '../notify/notify.module';
import {TagModule} from "../tag/tag.module";

@Module({
  imports: [
    NotifyModule,
    TagModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    TagService,
  ],
})
export class PostModule {}
