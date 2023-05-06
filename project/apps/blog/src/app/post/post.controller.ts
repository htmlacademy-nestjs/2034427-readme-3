import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {PostType} from '@prisma/client';
import {PaginationQuery, PostQuery, SearchQuery, UserIdDto} from '@project/shared/dto';
import {IPost} from '@project/shared/app-types';
import {PostService} from './post.service';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {UpdatePhotoDto} from './dto/update-photo.dto';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Post('video')
  public async createVideo(@Body() dto: CreateVideoDto): Promise<IPost> {
    return  this.postService.createPost(dto, PostType.video);
  }

  @Post('text')
  public async createText(@Body() dto: CreateTextDto): Promise<IPost> {
    return this.postService.createPost(dto, PostType.text);
  }

  @Post('quote')
  public async createQuote(@Body() dto: CreateQuoteDto): Promise<IPost> {
    return this.postService.createPost(dto, PostType.quote);
  }

  @Post('photo')
  public async createPhoto(@Body() dto: CreatePhotoDto): Promise<IPost> {
    return await this.postService.createPost(dto, PostType.photo);
  }

  @Post('link')
  public async createLink(@Body() dto: CreateLinkDto): Promise<IPost> {
    return this.postService.createPost(dto, PostType.link);
  }

  @Patch(':id/video')
  public async updateVideo(@Param('id') postId: number, @Body() dto: CreateVideoDto): Promise<IPost> {
    return  this.postService.updatePost(postId, dto, PostType.video);
  }

  @Patch(':id/text')
  public async updateText(@Param('id') postId: number, @Body() dto: CreateTextDto): Promise<IPost> {
    return this.postService.updatePost(postId, dto, PostType.text);
  }

  @Patch(':id/quote')
  public async updateQuote(@Param('id') postId: number, @Body() dto: CreateQuoteDto): Promise<IPost> {
    return this.postService.updatePost(postId, dto, PostType.quote);
  }

  @Patch(':id/photo')
  public async updatePhoto(@Param('id') postId: number, @Body() dto: UpdatePhotoDto): Promise<IPost> {
    return this.postService.updatePost(postId, dto, PostType.photo);
  }

  @Patch(':id/link')
  public async updateLink(@Param('id') postId: number, @Body() dto: CreateLinkDto): Promise<IPost> {
    return this.postService.updatePost(postId, dto, PostType.link);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/user/:userId')
  public async delete(@Param('id') postId: number, @Param('userId') userId: string): Promise<void> {
    await this.postService.deletePost(postId, userId);
  }

  @Get()
  public async getAll(@Query() query: PostQuery): Promise<IPost[]> {
    return this.postService.getAll(query);
  }

  @Get('users')
  public async findByUsers(@Query() query: string[]) {
    return this.postService.getByUserIds(Object.values(query));
  }

  @Get('search')
  public async search(@Query() query: SearchQuery) {
    return this.postService.search(query);
  }

  @Get(':id')
  public async show(@Param('id') postId: number): Promise<IPost> {
    return this.postService.getPost(postId);
  }

  @Get('user/:id')
  public async getByUserId(@Param('id') userId: string, @Query() query: PaginationQuery): Promise<IPost[]> {
    return this.postService.getByAuthor(userId, query);
  }

  @Get('tag/:id')
  public async getByTagId(@Param('id') tagId: number, @Query() query: PaginationQuery): Promise<IPost[]> {
    return this.postService.getByTagId(tagId, query);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/status')
  public async changeStatus(@Param('id') postId: number, @Body() {userId}: UserIdDto) {
    return this.postService.changeStatus(postId, userId);
  }

  @Post('repost/:id')
  public async rePost(@Param('id') postId: number, @Body() {userId}: UserIdDto): Promise<IPost> {
    return this.postService.rePost(postId, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/favorite')
  public async favorite(@Param('id') postId: number, @Body() {userId}: UserIdDto): Promise<IPost> {
    return this.postService.favorite(postId, userId);
  }

  @Get('draft/user/:id')
  public async getDraft(@Param('id') userId: string): Promise<IPost[]> {
    return this.postService.getDraft(userId);
  }
}
