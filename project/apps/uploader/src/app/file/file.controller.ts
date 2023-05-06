import {Body, Controller, Inject, Post} from '@nestjs/common';
import {FileType} from '@project/shared/app-types';
import {uploaderConfig} from '@project/config/config-uploader';
import {ConfigType} from '@nestjs/config';
import {FileService} from './file.service';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(uploaderConfig.KEY) private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) {}

  @Post('upload')
  public async uploadFile(@Body() file: FileType) {
   return this.fileService.writeFile(file);
  }
}
