import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {fillObject} from "@project/util/util-core";
import {CommentRdo} from "./rdo/comment.rdo";
import {CommentQuery} from "./query/comment.query";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list for post'
  })
  @ApiImplicitQuery({name: 'limit', required: false, type: Number})
  @ApiImplicitQuery({name: 'page', required: false, type: Number})
  @Get(':id/post')
  public async getByPost(@Param('id') postId: number, @Query() query: CommentQuery) {
    const comments = await this.commentService.findByPostId(postId, query);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment has been successfully created'
  })
  @Post()
  public async create(@Body() dto: CreateCommentDto) {
    const comments = await this.commentService.create(dto);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment has been successfully deleted'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') commentId: number) {
    return this.commentService.delete(commentId);
  }
}
