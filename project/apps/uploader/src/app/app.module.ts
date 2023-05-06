import { Module } from '@nestjs/common';
import {ConfigUploaderModule} from '@project/config/config-uploader';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
