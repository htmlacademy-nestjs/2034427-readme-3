import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {TagService} from './tag.service';
import {CreateTagDto} from "@project/shared/dto";
import {ITag} from "@project/shared/app-types";

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) {}

  @Get()
  public async index(): Promise<ITag[]> {
    return this.tagService.getTags();
  }

  @Post()
  public async create(@Body() dto: CreateTagDto): Promise<ITag> {
    return this.tagService.createTag(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number): Promise<void> {
    await this.tagService.deleteTag(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() dto: CreateTagDto): Promise<ITag> {
    return this.tagService.updateTag(id, dto);
  }
}
