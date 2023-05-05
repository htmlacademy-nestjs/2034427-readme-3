import {Inject, Injectable} from '@nestjs/common';
import {uploaderConfig} from '@project/config/config-uploader';
import {FileType} from '@project/shared/app-types';
import {ConfigType} from '@nestjs/config';
import { ensureDir, remove } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import * as crypto from 'node:crypto';
import { extension } from 'mime-types';
import dayjs from 'dayjs';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY) private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) {}

  public async writeFile(file: FileType): Promise<string> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, Buffer.from(file.buffer));

    return `${this.applicationConfig.serveRoot}/${subDirectory}/${hashName}`;
  }

  public async delete(path: string) {
    const pathParts = path.split('/');
    pathParts.splice(1, 1);
    const filePath = `${this.applicationConfig.uploadDirectory}${pathParts.join('/')}`;
    await remove(filePath);
  }
}
