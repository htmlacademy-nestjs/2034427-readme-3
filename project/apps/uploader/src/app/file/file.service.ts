import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {uploaderConfig} from '@project/config/config-uploader';
import {FileType, IFile} from '@project/shared/app-types';
import {ConfigType} from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { extension } from 'mime-types';
import { FileRepository } from './file.repository';
import { FileEntity } from './file.entity';
import * as crypto from 'node:crypto';
import dayjs from 'dayjs';

type WritedFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
}

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY) private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository,
  ) {}

  public async saveFile(file: FileType): Promise<IFile> {
    const writedFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string): Promise<IFile> {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }

  private async writeFile(file: FileType): Promise<WritedFile> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }
}
