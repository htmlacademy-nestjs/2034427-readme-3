import { Module } from '@nestjs/common';
import {ConfigUploaderModule} from '@project/config/config-uploader';
import {MongooseModule} from '@nestjs/mongoose';
import {getMongooseOptions} from '@project/util/util-core';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('application.db')
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
