import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {fillObject} from '@project/util/util-core';
import {ApiTags} from '@nestjs/swagger';
import {TagService} from './tag.service';
import {TagRdo} from './rdo/tag.rdo';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) {}

  @Get()
  public async index() {
    const tagList = await this.tagService.getTags();
    return fillObject(TagRdo, tagList);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const tagId = parseInt(id, 10);
    const existTag = await this.tagService.getTag(tagId);
    return fillObject(TagRdo, existTag);
  }

  @Post()
  public async create(@Body() dto: CreateTagDto) {
    const newTag = await this.tagService.createTag(dto);
    return fillObject(TagRdo, newTag);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    const tagId = parseInt(id, 10);
    await this.tagService.deleteTag(tagId);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const tagId = parseInt(id, 10);
    const updatedTag = await this.tagService.updateTag(tagId, dto);
    return fillObject(TagRdo, updatedTag);
  }
}
