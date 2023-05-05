import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {HttpService} from '@nestjs/axios';
import {FileType, IPost} from '@project/shared/app-types';
import {ApiImplicitQuery} from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import {PostStatus, PostType} from '@prisma/client';
import {
  PaginationQuery,
  PostLinkDto,
  PostPhotoDto,
  PostQuery,
  PostQuoteDto,
  PostTextDto,
  PostVideoDto,
  SearchQuery,
  SortingType
} from '@project/shared/dto';
import {fillObject} from '@project/util/util-core';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {UserId} from '../decorators/user-id.decorator';
import {ApplicationServiceURL} from '../app.config';
import {PostRdo} from '../rdo/post.rdo';
import {UserRdo} from '../rdo/user.rdo';
import {PostDetailsRdo} from '../rdo/post-details.rdo';
import {CommentRdo} from '../rdo/comment.rdo';
import {PostWithStatusRdo} from '../rdo/post-with-status.rdo';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Posts list'
  })
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
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}`, {params: query});
    return await this.joinUsers(data);
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Feed posts'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/feed')
  public async feed(@UserId() userId: string) {
    const usersResponse = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/feed/${userId}`);
    const userIds = usersResponse.data.map((user) => user._id);
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/users/`, {params: userIds});

    return data.map((post) => {
      const user = usersResponse.data.find((user) => user._id === post.userId);
      const author = fillObject(UserRdo, {...user, id: user._id.toString()});
      return fillObject(PostRdo, {...post, author});
    });
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'found posts'
  })
  @ApiImplicitQuery({name: 'query', required: true, type: String})
  @Get('search')
  public async search(@Query() query: SearchQuery) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/search`, {params: query});
    return this.joinUsers(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Video post has been successfully created'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('video')
  public async createVideo(@Body() dto: PostVideoDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/video`, {...dto, userId});
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}/post-count/inc`);
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('text')
  public async createText(@Body() dto: PostTextDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/text`, {...dto, userId});
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}/post-count/inc`);
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('quote')
  public async createQuote(@Body() dto: PostQuoteDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/quote`, {...dto, userId});
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}/post-count/inc`);
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('photo')
  public async createPhoto(
    @Body() dto: PostPhotoDto,
    @UserId() userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 1024 * 1024}),
          new FileTypeValidator({fileType: '.(png|jpeg|jpg)'})
        ],
        fileIsRequired: true
      })
    ) photo: FileType
  ) {
    const uploaderResponse = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/upload`, photo)
    const {data} = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/photo`, {...dto, userId, photo: uploaderResponse.data}
    );
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}/post-count/inc`);
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post has been successfully created'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('link')
  public async createLink(@Body() dto: PostLinkDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/link`, {...dto, userId});
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}/post-count/inc`);
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/video')
  public async updateVideo(@Param('id') postId: number, @Body() dto: PostVideoDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/video`, {...dto, userId});
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/text')
  public async updateText(@Param('id') postId: number, @Body() dto: PostTextDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/text`, {...dto, userId});
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/quote')
  public async updateQuote(@Param('id') postId: number, @Body() dto: PostQuoteDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/quote`, {...dto, userId});
    return await this.joinUser(data);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/photo')
  public async updatePhoto(
    @Param('id') postId: number,
    @Body() dto: PostPhotoDto,
    @UserId() userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 1024 * 1024}),
          new FileTypeValidator({fileType: '.(png|jpeg|jpg)'})
        ],
        fileIsRequired: false
      })
    ) photo: FileType
  ) {
    const uploaderResponse = photo ? await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/upload`, photo) : null;
    const {data} = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Posts}/${postId}/photo`,
      {...dto, userId, photo: uploaderResponse?.data}
    );
    const photoImg = uploaderResponse?.data ?? data.photo;
    return this.joinUser({...data, photo: photoImg});
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post has been successfully updated'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id/link')
  public async updateLink(@Param('id') postId: number, @Body() dto: PostLinkDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/link`, {...dto, userId});
    return await this.joinUser(data);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been successfully deleted'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') postId: number, @UserId() userId: string) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${postId}/user/${userId}`);
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${userId}/post-count/dec`);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Added or removed post like'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/favorite')
  public async favorite(@Param('id') postId: number, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/${postId}/favorite`, {userId});
    return this.joinUser(data);
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Draft posts list'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('draft')
  public async getDraft(@UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/draft/user/${userId}`);
    return await this.joinUsers(data);
  }

  @ApiResponse({
    type: PostDetailsRdo,
    status: HttpStatus.OK,
    description: 'Post found'
  })
  @Get(':id')
  public async show(@Param('id') postId: number) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/${postId}`);
    return await this.joinUser(data, true);
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'User posts list'
  })
  @ApiImplicitQuery({name: 'limit', required: false, type: Number})
  @ApiImplicitQuery({name: 'page', required: false, type: Number})
  @Get('/user/:id')
  public async getUserPosts(@Param('id') userId: string, @Query() query: PaginationQuery) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/user/${userId}`, {
      params: query,
    });
    return await this.joinUsers(data);
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Tag posts list'
  })
  @ApiImplicitQuery({name: 'limit', required: false, type: Number})
  @ApiImplicitQuery({name: 'page', required: false, type: Number})
  @Get('/tag/:id')
  public async getByTagId(@Param('id') tagId: number, @Query() query: PaginationQuery) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/tag/${tagId}`, {
      params: query,
    });
    return await this.joinUsers(data);
  }

  @ApiResponse({
    type: PostWithStatusRdo,
    status: HttpStatus.OK,
    description: 'Status switched'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/status')
  public async changeStatus(@Param('id') postId: number, @UserId() userId: string): Promise<PostWithStatusRdo> {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/${postId}/status`, {userId});
    const changedPost = await this.joinUser(data);
    return {...changedPost, status: data.status}
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Repost has been successfully created'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('repost/:id')
  public async rePost(@Param('id') postId: number, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/repost/${postId}`, {userId});
    return await this.joinUser(data);
  }

  private async joinUser(post: IPost, details = false) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${post.userId}`);
    const author = fillObject(UserRdo, {...data, id: data._id.toString()});
    const rdo = details ? PostDetailsRdo : PostRdo;
    return fillObject(rdo, {...post, author, comments: fillObject(CommentRdo, post.comments)});
  }

  private async joinUsers(posts: IPost[]) {
    const usersResponse = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/ids`, {
      params: [...new Set(posts.map((post) => post.userId))],
    });
    return posts.map((post: IPost) => {
      const user = usersResponse.data.find((user) => user._id === post.userId);
      const author = fillObject(UserRdo, {...user, id: user._id.toString()});
      return fillObject(PostRdo, {...post, author});
    });
  }
}
