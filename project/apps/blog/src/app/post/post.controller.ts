import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiImplicitQuery} from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@project/util/util-core';
import {PostType, PostStatus} from '@prisma/client';
import {PostService} from './post.service';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {PostRdo} from './rdo/post.rdo'
import {PostQuery, SortingType} from './query/post.query';

@ApiTags('post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Video post has been successfully created'
  })
  @Post('video')
  public async createVideo(@Body() dto: CreateVideoDto) {
    const post = await this.postService.createPost(dto, PostType.video);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('text')
  public async createText(@Body() dto: CreateTextDto) {
    const post = await this.postService.createPost(dto, PostType.text);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('quote')
  public async createQuote(@Body() dto: CreateQuoteDto) {
    const post = await this.postService.createPost(dto, PostType.quote);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('photo')
  public async createPhoto(@Body() dto: CreatePhotoDto) {
    const post = await this.postService.createPost(dto, PostType.photo);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('link')
  public async createLink(@Body() dto: CreateLinkDto) {
    const post = await this.postService.createPost(dto, PostType.link);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/video')
  public async updateVideo(@Param('id') postId: number, @Body() dto: CreateVideoDto) {
    const post = await this.postService.updatePost(postId, dto, PostType.video);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/text')
  public async updateText(@Param('id') postId: number, @Body() dto: CreateTextDto) {
    const post = await this.postService.updatePost(postId, dto, PostType.text);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/quote')
  public async updateQuote(@Param('id') postId: number, @Body() dto: CreateQuoteDto) {
    const post = await this.postService.updatePost(postId, dto, PostType.quote);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/photo')
  public async updatePhoto(@Param('id') postId: number, @Body() dto: CreatePhotoDto) {
    const post = await this.postService.updatePost(postId, dto, PostType.photo);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/link')
  public async updateLink(@Param('id') postId: number, @Body() dto: CreateLinkDto) {
    const post = await this.postService.updatePost(postId, dto, PostType.link);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been successfully deleted'
  })
  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param('id') postId: number) {
    await this.postService.deletePost(postId);
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Get all posts list'
  })
  @ApiImplicitQuery({name: 'userId', required: false, type: String})
  @ApiImplicitQuery({name: 'tag', required: false, type: String})
  @ApiImplicitQuery({name: 'limit', required: false, type: Number})
  @ApiImplicitQuery({name: 'page', required: false, type: Number})
  @ApiImplicitQuery({
    name: 'sort',
    required: false,
    enum: [SortingType.PublishAt, SortingType.Likes, SortingType.Comments]
  })
  @ApiImplicitQuery({
    name: 'postType',
    required: false,
    enum: [PostType.video, PostType.photo, PostType.text, PostType.link, PostType.quote]
  })
  @ApiImplicitQuery({
    name: 'status',
    required: false,
    enum: [PostStatus.publish, PostStatus.draft],
  })
  @ApiImplicitQuery({
    name: 'direction',
    required: false,
    enum: ['desc', 'asc'],
  })
  @Get()
  public async getAll(@Query() query: PostQuery) {
    const posts = await this.postService.getAll(query);
    return  fillObject(PostRdo, posts);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post found'
  })
  @Get(':id')
  public async show(@Param('id') postId: number) {
    const post = await this.postService.getPost(postId);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Get user posts list'
  })
  @Get(':id/user')
  public async getByUserId(@Param('id') userId: string) {
    const posts = await this.postService.getByAuthor(userId);
    return fillObject(PostRdo, posts);
  }
}
