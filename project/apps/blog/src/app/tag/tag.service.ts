import {BadRequestException, Injectable} from '@nestjs/common';
import {ITag} from '@project/shared/app-types';
import {CreateTagDto} from '@project/shared/dto';
import {TagRepository} from './tag.repository';
import {TagEntity} from './tag.entity';
import {MAX_COUNT_TAGS, MAX_COUNT_TAGS_ERROR} from "./tag.constant";

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
  ) {}

  public async createTag(dto: CreateTagDto): Promise<ITag> {
    const tagEntity = new TagEntity(dto);
    return this.tagRepository.create(tagEntity);
  }

  public async deleteTag(id: number): Promise<void> {
    await this.tagRepository.destroy(id);
  }

  public async getTag(id: number): Promise<ITag> {
    return this.tagRepository.findById(id);
  }

  public async findOrCreateTags(tagTitles: string[]): Promise<ITag[]> {
    if (tagTitles?.length > MAX_COUNT_TAGS) {
      throw new BadRequestException(MAX_COUNT_TAGS_ERROR);
    }
    const tags = new Set(tagTitles);
    const tagsList = [];
    for (const title of tags) {
      let tag = await this.tagRepository.findByTitle(title);
      if (!tag) {
        tag = await this.tagRepository.create(new TagEntity({title}));
      }
      tagsList.push(tag);
    }
    return tagsList;
  }

  public async getTags(): Promise<ITag[]> {
    return this.tagRepository.find();
  }

  public async updateTag(id: number, dto: CreateTagDto): Promise<ITag> {
    const tagEntity = new TagEntity(dto);
    return this.tagRepository.update(id, tagEntity);
  }
}
