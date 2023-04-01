import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import {ConfigCommentsModule} from "@project/config/config-comments";

@Module({
  imports: [
    CommentModule,
    ConfigCommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
