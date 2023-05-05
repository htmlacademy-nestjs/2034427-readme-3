import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {IComment} from '@project/shared/app-types';
import {PaginationQuery} from '@project/shared/dto';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get('post/:id')
  public async getByPost(@Param('id') postId: number, @Query() query: PaginationQuery): Promise<IComment[]> {
    return this.commentService.findByPostId(postId, query);
  }

  @Post()
  public async create(@Body() dto: CreateCommentDto): Promise<IComment> {
   return this.commentService.create(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/user/:userId')
  public async delete(@Param('id') commentId: number, @Param('userId') userId: string): Promise<void> {
    await this.commentService.delete(commentId, userId);
  }
}
