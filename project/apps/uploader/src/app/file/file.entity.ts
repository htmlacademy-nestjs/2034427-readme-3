import {IEntity} from "@project/util/util-types";
import {IFile} from "@project/shared/app-types";

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
    // this.id = entity.id;
    // this.hashName = entity.hashName;
    // this.mimetype = entity.mimetype;
    // this.originalName = entity.originalName;
    // this.path = entity.path;
    // this.size = entity.size;
  }

  public toObject(): FileEntity {
    return {...this }
  }
}
