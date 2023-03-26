import { Injectable } from '@nestjs/common';
import {CommentMemoryRepository} from './comment-memory.repository';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentEntity} from "./comment.entity";

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentMemoryRepository) {}

  public async create({text, postId}: CreateCommentDto) {
    const comment = {text, postId, author: '', createdAt: new Date().toISOString()};
    const commentEntity = new CommentEntity(comment);
    return this.commentRepository.create(commentEntity);
  }

  public async delete(id: string) {
    return this.commentRepository.destroy(id);
  }

  public async findByPostId(postId: string) {
    return await this.commentRepository.findByPostId(postId);
  }
}
