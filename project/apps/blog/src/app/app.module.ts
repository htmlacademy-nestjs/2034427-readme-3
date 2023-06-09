import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigBlogModule } from '@project/config/config-blog';
import { PrismaModule } from './prisma/prisma.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { NotifyModule } from './notify/notify.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    PostModule,
    ConfigBlogModule,
    PrismaModule,
    TagModule,
    CommentModule,
    NotifyModule,
    FavoriteModule,
  ],
})
export class AppModule {}
