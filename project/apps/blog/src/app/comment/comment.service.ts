import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PaginationQuery} from '@project/shared/dto';
import {IComment} from '@project/shared/app-types';
import {CommentRepository} from './comment.repository';
import {PostService} from '../post/post.service';
import {CommentEntity} from './comment.entity';
import {CreateCommentDto} from './dto/create-comment.dto';
import {COMMENT_NOT_FOUND, NOT_AUTHOR, YOUR_POST} from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  public async create(dto: CreateCommentDto): Promise<IComment> {
    const commentPost = await this.postService.getPost(dto.postId);
    if (commentPost.userId === dto.userId) {
      throw new BadRequestException(YOUR_POST);
    }
    const commentEntity = new CommentEntity(dto);
    await this.postService.incrementCommentCount(dto.postId);
    return this.commentRepository.create(commentEntity);
  }

  public async delete(commentId: number, userId: string): Promise<void> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND)
    }
    if (comment.userId !== userId) {
      throw new BadRequestException(NOT_AUTHOR);
    }
    await this.postService.decrementCommentCount(comment.postId);
    await this.commentRepository.destroy(commentId);
  }

  public async findByPostId(postId: number, query: PaginationQuery): Promise<IComment[]> {
    const existPost = await this.postService.getPost(postId);
    return await this.commentRepository.find(query, existPost.postId);
  }
}
