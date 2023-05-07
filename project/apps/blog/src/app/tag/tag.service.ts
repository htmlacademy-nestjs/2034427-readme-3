import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ITag} from '@project/shared/app-types';
import {CreateTagDto} from '@project/shared/dto';
import {TagRepository} from './tag.repository';
import {TagEntity} from './tag.entity';
import {
  INCORRECT_TAG,
  MAX_COUNT_TAGS_ERROR,
  TAG_NOT_EMPTY,
  TAG_NOT_FOUND,
  TAG_REGEXP,
  TagConstant
} from "@project/shared/validation";

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
  ) {}

  public async createTag(dto: CreateTagDto): Promise<ITag> {
    const tag = await this.findOrCreateTags([dto.title]);
    return tag[0];
  }

  public async deleteTag(id: number): Promise<void> {
    const tag = await this.tagRepository.findById(id);
    if (tag['posts'].length > 0) {
      throw new BadRequestException(TAG_NOT_EMPTY);
    }
    await this.tagRepository.destroy(id);
  }

  public async getTag(id: number): Promise<ITag> {
    return this.tagRepository.findById(id);
  }

  public async findOrCreateTags(tagTitles: string[]): Promise<ITag[]> {
    if (tagTitles?.length > TagConstant.MaxCount) {
      throw new BadRequestException(MAX_COUNT_TAGS_ERROR);
    }

    const tags = new Set(tagTitles);
    const tagsList = [];

    for (const title of tags) {
      if (!TAG_REGEXP.test(title)) {
        throw new BadRequestException(INCORRECT_TAG);
      }
      const lowerCaseTitle = title.toLowerCase();
      let tag = await this.tagRepository.findByTitle(lowerCaseTitle);
      if (!tag) {
        tag = await this.tagRepository.create(new TagEntity({title: lowerCaseTitle}));
      }
      tagsList.push(tag);
    }

    return tagsList;
  }

  public async getTags(): Promise<ITag[]> {
    return this.tagRepository.find();
  }

  public async updateTag(id: number, dto: CreateTagDto): Promise<ITag> {
    const existTag = await this.tagRepository.findById(id);

    if (!existTag) {
      throw new NotFoundException(TAG_NOT_FOUND)
    }

    const tagEntity = new TagEntity(dto);
    return this.tagRepository.update(id, tagEntity);
  }
}
