import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import appConfig from './config/app.config';
import dbConfig from './config/db.config';

const ENV_ACCOUNTS_FILE_PATH = 'apps/accounts/.accounts.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig],
      envFilePath: ENV_ACCOUNTS_FILE_PATH
    })
  ]
})
export class ConfigAccountsModule {}
