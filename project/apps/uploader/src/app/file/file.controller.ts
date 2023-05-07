import {Body, Controller, Post} from '@nestjs/common';
import {FileType} from '@project/shared/app-types';
import {FileService} from './file.service';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @Post('upload')
  public async uploadFile(@Body() file: FileType) {
   return this.fileService.writeFile(file);
  }
}
