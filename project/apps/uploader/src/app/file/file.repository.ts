import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {FileModel} from "./file.model";
import {FileEntity} from "./file.entity";
import {IFile} from "@project/shared/app-types";

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>,
  ) {}

  public async create(item: FileEntity): Promise<IFile> {
    const file = new this.fileModel(item);
    return file.save();
  }

  public async findById(id: string): Promise<IFile | null> {
    return this.fileModel
      .findOne({ _id: id})
      .exec();
  }
}
