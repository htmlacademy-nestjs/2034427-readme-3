import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import {IPost} from '@project/shared/app-types';
import {PostType} from '@prisma/client';
import {PostRepository} from './post.repository';
import {PostEntity} from './post.entity';
import {POST_NOT_FOUND} from './post.constant';
import {PostQuery} from './query/post.query';
import {TagService} from '../tag/tag.service';
import {CreatePostType} from './types/create-post.type';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagService: TagService,
  ) {}

  public async createPost(dto: CreatePostType, postType: PostType): Promise<IPost> {
    const tags = await this.tagService.findOrCreateTags(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType});
    return this.postRepository.create(postEntity);
  }

  public async updatePost(postId: number, dto: CreatePostType, postType: PostType): Promise<IPost> {
    const existPost = await this.getPost(postId);
    if (existPost.postType !== postType) {
      throw new BadRequestException(`This post is not a type ${postType}`);
    }
    const tags = await this.tagService.findOrCreateTags(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType});
    return this.postRepository.update(existPost.postId, postEntity);
  }

  public async deletePost(id: number): Promise<void> {
    const deletedPost = await this.getPost(id);
    await this.postRepository.destroy(deletedPost.postId);
  }

  public async getAll(query: PostQuery): Promise<IPost[]> {
    return this.postRepository.find(query);
  }

  public async getByAuthor(userId: string): Promise<IPost[]> {
    return this.postRepository.getByUserId(userId);
  }

  public async getPost(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return new PostEntity(post);
  }

  public async incrementCommentCount(postId: number): Promise<void> {
    const post = await this.getPost(postId);
    post.incrementCommentCount();
    await this.postRepository.update(postId, post);
  }

  public async decrementCommentCount(postId: number): Promise<void> {
    const post = await this.getPost(postId);
    post.decrementCommentCount();
    await this.postRepository.update(postId, post);
  }
}
