import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment has been successfully created'
  })
  @Post()
  public async create(@Body() dto: CreateCommentDto) {
    return await this.commentService.create(dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment has been successfully deleted'
  })
  @HttpCode(204)
  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list for post'
  })
  @Get(':postId/post')
  public async getByPost(@Param('postId') postId: string) {
    return await this.commentService.findByPostId(postId);
  }
}
