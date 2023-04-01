import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import {ConfigBlogModule} from "@project/config/config-blog";

@Module({
  imports: [
    PostModule,
    ConfigBlogModule,
  ],
})
export class AppModule {}
