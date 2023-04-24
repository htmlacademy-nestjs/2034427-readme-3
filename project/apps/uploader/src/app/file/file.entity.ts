import {IEntity} from '@project/util/util-types';
import {IFile} from '@project/shared/app-types';

export class FileEntity implements IEntity<FileEntity>, IFile {
  public id: string;
  public hashName: string;
  public mimetype: string;
  public originalName: string;
  public path: string;
  public size: number;

  constructor(file: IFile) {
    this.fillEntity(file);
  }

  public fillEntity(entity): void {
    Object.assign(this, entity);
  }

  public toObject(): FileEntity {
    return {...this }
  }
}
