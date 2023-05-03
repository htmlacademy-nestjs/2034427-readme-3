import { Module } from '@nestjs/common';
import {ConfigGatewayModule} from '@project/config/config-getway';
import {HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT} from './app.config';
import {HttpModule} from '@nestjs/axios';
import {AuthController} from './controllers/auth.controller';
import {UsersController} from './controllers/users.controller';
import {JwtAuthStrategy} from './strategies/jwt-auth.strategy';
import {PostsController} from './controllers/posts.controller';
import {CommentsController} from "./controllers/comments.controller";
import {TagsController} from "./controllers/tags.controller";
import {MailController} from "./controllers/mail.controller";

@Module({
  imports: [
    ConfigGatewayModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    PostsController,
    CommentsController,
    TagsController,
    MailController,
  ],
  providers: [JwtAuthStrategy],
})
export class AppModule {}
