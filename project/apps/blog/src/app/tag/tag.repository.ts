import {Injectable} from '@nestjs/common';
import {ICRUDRepository} from '@project/util/util-types';
import {ITag} from '@project/shared/app-types';
import {TagEntity} from './tag.entity';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class TagRepository implements ICRUDRepository<TagEntity, number, ITag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TagEntity): Promise<ITag> {
    return this.prisma.tag.create({
      data: {...item.toObject()},
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {id}
    });
  }

  public async findById(id: number): Promise<ITag | null> {
    return this.prisma.tag.findFirst({
      where: {id}
    });
  }

  public async findByIds(ids: number[]): Promise<ITag[]> {
    return this.prisma.tag.findMany({
      where: {
        id: {
          in: ids?.length > 0 ? ids : [],
        }
      }
    })
  }

  public async find(): Promise<ITag[]> {
    return this.prisma.tag.findMany();
  }

  public update(id: number, item: TagEntity): Promise<ITag> {
    return this.prisma.tag.update({
      where: {id},
      data: {...item.toObject(), id}
    })
  }
}
