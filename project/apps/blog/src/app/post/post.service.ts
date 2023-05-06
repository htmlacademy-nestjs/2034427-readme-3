import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import {CreatePostType, IPost} from '@project/shared/app-types';
import {PostType} from '@prisma/client';
import {PostRepository} from './post.repository';
import {PostEntity} from './post.entity';
import {TagService} from '../tag/tag.service';
import {PaginationQuery, PostQuery, SearchQuery} from '@project/shared/dto';
import {FavoriteRepository} from '../favorite/favorite.repository';
import {NotifyService} from '../notify/notify.service';
import {EXIST_REPOST, INVALID_POST_TYPE, IS_AUTHOR, IS_REPOST, NO_AUTHOR, POST_NOT_FOUND} from './post.constant';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagService: TagService,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly notifyService: NotifyService
  ) {}

  public async createPost(dto: CreatePostType, postType: PostType): Promise<IPost> {
    const tags = await this.tagService.findOrCreateTags(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType});
    const newPost = await this.postRepository.create(postEntity);
    await this.notifyService.register(newPost);
    return newPost;
  }

  public async updatePost(postId: number, dto: CreatePostType, postType: PostType) {
    const existPost = await this.getPost(postId);
    if (existPost.userId !== dto.userId) {
      throw new BadRequestException(NO_AUTHOR)
    }
    if (existPost.postType !== postType) {
      throw new BadRequestException(INVALID_POST_TYPE);
    }
    if (dto.photo) {
      await this.notifyService.deletePhoto(existPost.photo);
    }
    const tags = await this.tagService.findOrCreateTags(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType});
    return this.postRepository.update(existPost.postId, postEntity);
  }

  public async deletePost(id: number, userId: string): Promise<void> {
    const deletedPost = await this.getPost(id);
    if (deletedPost.userId !== userId) {
      throw new BadRequestException(NO_AUTHOR);
    }
    await this.notifyService.deletePhoto(deletedPost.photo);
    await this.postRepository.destroy(deletedPost.postId);
  }

  public async getAll(query: PostQuery): Promise<IPost[]> {
    return this.postRepository.find(query);
  }

  public async getByAuthor(userId: string, query: PaginationQuery): Promise<IPost[]> {
    return this.postRepository.findByUserId(userId, query);
  }

  public async getByTagId(tagId: number, query: PaginationQuery) {
    return this.postRepository.findByTagId(tagId, query);
  }

  public async getByUserIds(userIds: string[]): Promise<IPost[]> {
    return this.postRepository.findByUserIds(userIds);
  }

  public async search({query}: SearchQuery) {
    return this.postRepository.search(query);
  }

  public async getDraft(userId: string): Promise<IPost[]> {
    return await this.postRepository.findDraftByUserId(userId);
  }

  public async getPost(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return new PostEntity(post);
  }

  public async changeStatus(postId: number, userId: string): Promise<IPost> {
    const existPost = await this.getPost(postId);
    if (existPost.userId !== userId) {
      throw new BadRequestException(NO_AUTHOR);
    }
    existPost.toggleStatus();
    return this.postRepository.update(postId, existPost);
  }

  public async rePost(postId: number, userId: string) {
    const originalPost = await this.getPost(postId);
    if (originalPost.userId === userId) {
      throw new BadRequestException(IS_AUTHOR)
    }

    const existRepost = await this.postRepository.findRepost(postId, userId);
    if (existRepost) {
      throw new BadRequestException(EXIST_REPOST);
    }
    if (originalPost.isRepost) {
      throw new BadRequestException(IS_REPOST);
    }

    const postEntity = new PostEntity(originalPost);
    postEntity.createRepost(userId);

    return this.postRepository.create(postEntity);
  }

  public async favorite(postId: number, userId: string): Promise<IPost> {
    const post = await this.getPost(postId);
    const favorite = await this.favoriteRepository.findFavorite(userId, postId);
    if (favorite) {
      await this.favoriteRepository.destroy(favorite.favoriteId);
      post.decrementLikeCount();
    } else {
      await this.favoriteRepository.create(userId, postId);
      post.incrementLikeCount();
    }
    return this.postRepository.update(postId, post);
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
