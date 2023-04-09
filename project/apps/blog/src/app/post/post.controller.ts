import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@project/util/util-core';
import {PostService} from './post.service';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {PostRdo} from './rdo/post.rdo'

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
    const post = await this.postService.createVideoPost(dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('text')
  public async createText(@Body() dto: CreateTextDto) {
    const post = await this.postService.createTextPost(dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('quote')
  public async createQuote(@Body() dto: CreateQuoteDto) {
    const post = await this.postService.createQuotePost(dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('photo')
  public async createPhoto(@Body() dto: CreatePhotoDto) {
    const post = await this.postService.createPhotoPost(dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @Post('link')
  public async createLink(@Body() dto: CreateLinkDto) {
    const post = await this.postService.createLinkPost(dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/video')
  public async updateVideo(@Param('id') id: string, @Body() dto: CreateVideoDto) {
    const postId = parseInt(id, 10);
    const post = await this.postService.updateVideoPost(postId, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/text')
  public async updateText(@Param('id') id: string, @Body() dto: CreateTextDto) {
    const postId = parseInt(id, 10);
    const post = await this.postService.updateTextPost(postId, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/quote')
  public async updateQuote(@Param('id') id: string, @Body() dto: CreateQuoteDto) {
    const postId = parseInt(id, 10);
    const post = await this.postService.updateQuotePost(postId, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/photo')
  public async updatePhoto(@Param('id') id: string, @Body() dto: CreatePhotoDto) {
    const postId = parseInt(id, 10);
    const post = await this.postService.updatePhotoPost(postId, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Patch(':id/link')
  public async updateLink(@Param('id') id: string, @Body() dto: CreateLinkDto) {
    const postId = parseInt(id, 10);
    const post = await this.postService.updateLinkPost(postId, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been successfully deleted'
  })
  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    await this.postService.deletePost(postId);
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Get all posts list'
  })
  @Get()
  public async getAll() {
    const posts = await this.postService.getAll();
    return  fillObject(PostRdo, posts);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post found'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const postId = parseInt(id, 10);
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
