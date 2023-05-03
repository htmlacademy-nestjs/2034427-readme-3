import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiImplicitQuery} from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import {HttpService} from '@nestjs/axios';
import {CommentQuery} from '../query/comments.query';
import {ApplicationServiceURL} from '../app.config';
import {UserId} from '../decorators/user-id.decorator';
import {CreateCommentDto} from '../dto/create-comment.dto';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {fillObject} from "@project/util/util-core";
import {CommentRdo} from "../rdo/comment.rdo";

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatus.OK,
    description: 'Comments list for post'
  })
  @ApiImplicitQuery({name: 'limit', required: false, type: Number})
  @ApiImplicitQuery({name: 'page', required: false, type: Number})
  @Get('post/:id')
  public async getByPost(@Param('id') postId: number, @Query() query: CommentQuery) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/post/${postId}`, {
      params: query,
    });
    return data.map((comment) => fillObject(CommentRdo, comment));
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment has been successfully created'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  public async create(@Body() dto: CreateCommentDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}`, {...dto, userId});
    return fillObject(CommentRdo, data);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment has been successfully deleted'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') commentId: number, @UserId('userId') userId: string) {
    const {data} = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${commentId}/user/${userId}`);
    return data;
  }
}
