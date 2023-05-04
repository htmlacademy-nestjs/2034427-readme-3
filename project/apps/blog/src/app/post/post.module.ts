import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {PostRepository} from './post.repository';
import {TagService} from '../tag/tag.service';
import {NotifyModule} from '../notify/notify.module';
import {TagModule} from "../tag/tag.module";
import {FavoriteModule} from "../favorite/favorite.module";
import {FavoriteRepository} from "../favorite/favorite.repository";

@Module({
  imports: [
    NotifyModule,
    TagModule,
    FavoriteModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    TagService,
    FavoriteRepository,
  ],
})
export class PostModule {}
