import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import appConfig from './config/app.config';

const ENV_COMMENTS_FILE_PATH = 'apps/comments/.comments.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: ENV_COMMENTS_FILE_PATH,
    })
  ]
})
export class ConfigCommentsModule {}
