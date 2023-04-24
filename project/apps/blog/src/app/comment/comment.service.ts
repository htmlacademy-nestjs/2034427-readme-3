import { Injectable } from '@nestjs/common';
import {CommentRepository} from './comment.repository';
import {PostService} from '../post/post.service';
import {CommentEntity} from './comment.entity';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentQuery} from './query/comment.query';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  public async create(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity(dto);
    await this.postService.incrementCommentCount(dto.postId);
    return this.commentRepository.create(commentEntity);
  }

  public async delete(commentId: number) {
    const comment = await this.commentRepository.findById(commentId);
    await this.postService.decrementCommentCount(comment.postId);
    return this.commentRepository.destroy(commentId);
  }

  public async findByPostId(postId: number, query: CommentQuery) {
    const existPost = await this.postService.getPost(postId);
    return await this.commentRepository.find(query, existPost.postId);
  }
}
