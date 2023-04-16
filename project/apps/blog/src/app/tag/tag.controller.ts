import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {fillObject} from '@project/util/util-core';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
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

  @ApiResponse({
    type: [TagRdo],
    status: HttpStatus.OK,
  })
  @Get()
  public async index() {
    const tagList = await this.tagService.getTags();
    return fillObject(TagRdo, tagList);
  }

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
  })
  @Get(':id')
  public async show(@Param('id') id: number) {
    const existTag = await this.tagService.getTag(id);
    return fillObject(TagRdo, existTag);
  }

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.CREATED,
  })
  @Post()
  public async create(@Body() dto: CreateTagDto) {
    const newTag = await this.tagService.createTag(dto);
    return fillObject(TagRdo, newTag);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    await this.tagService.deleteTag(id);
  }

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
  })
  @Patch(':id')
  public async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.tagService.updateTag(id, dto);
    return fillObject(TagRdo, updatedTag);
  }
}
