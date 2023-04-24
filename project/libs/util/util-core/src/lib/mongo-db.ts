import {MongooseModuleAsyncOptions} from '@nestjs/mongoose';
import {ConfigService} from '@nestjs/config';
import {getMongoConnectionString} from './helpers';

export function getMongooseOptions(optionSpace: string): MongooseModuleAsyncOptions {
  return {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      uri: getMongoConnectionString({
        username: config.get<string>(`${optionSpace}.user`),
        password: config.get<string>(`${optionSpace}.password`),
        host: config.get<string>(`${optionSpace}.host`),
        port: config.get<string>(`${optionSpace}.port`),
        authDatabase: config.get<string>(`${optionSpace}.authBase`),
        databaseName: config.get<string>(`${optionSpace}.name`),
      }),
    }),
  }
}

