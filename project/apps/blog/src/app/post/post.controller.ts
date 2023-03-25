import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {PostService} from './post.service';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {count} from "rxjs";
import {fillObject} from "@project/util/util-core";
import {PostRdo} from "./rdo/post.rdo";
import {PostManyRdo} from "./rdo/post-many.rdo";

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
  @Put(':id/video')
  public async updateVideo(@Param('id') id: string, @Body() dto: CreateVideoDto) {
    const post = await this.postService.updateVideoPost(id, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Put(':id/text')
  public async updateText(@Param('id') id: string, @Body() dto: CreateTextDto) {
    const post = await this.postService.updateTextPost(id, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Put(':id/quote')
  public async updateQuote(@Param('id') id: string, @Body() dto: CreateQuoteDto) {
    const post = await this.postService.updateQuotePost(id, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Put(':id/photo')
  public async updatePhoto(@Param('id') id: string, @Body() dto: CreatePhotoDto) {
    const post = await this.postService.updatePhotoPost(id, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @Put(':id/link')
  public async updateLink(@Param('id') id: string, @Body() dto: CreateLinkDto) {
    const post = await this.postService.updateLinkPost(id, dto);
    return fillObject(PostRdo, post);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been successfully deleted'
  })
  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @ApiResponse({
    type: PostManyRdo,
    status: HttpStatus.OK,
    description: 'Get all posts list'
  })
  @Get()
  public async getAll() {
    const posts = await this.postService.getAll();
    return this.postService.postsResponse(
      posts.map((post) => fillObject(PostRdo, post))
    );
  }

  @ApiResponse({
    type: PostManyRdo,
    status: HttpStatus.OK,
    description: 'Get user posts list'
  })
  @Get(':userId/user')
  public async getByUser(@Param('userId') userId: string) {
    const posts = await this.postService.getByAuthor(userId);
    return this.postService.postsResponse(
      posts.map((post) => fillObject(PostRdo, post))
    );
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post found'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);
    return fillObject(PostRdo, post);
  }
}
