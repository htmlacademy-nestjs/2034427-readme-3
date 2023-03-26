import {Injectable, NotFoundException} from '@nestjs/common';
import {PostMemoryRepository} from './post-memory.repository';
import {CreateVideoDto} from './dto/create-video.dto';
import {IPost, PostStatus, PostType} from '@project/shared/app-types';
import {PostEntity} from './post.entity';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {POST_NOT_FOUND} from './post.constant';
import {PostManyRdo} from "./rdo/post-many.rdo";
import {PostRdo} from "./rdo/post.rdo";

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostMemoryRepository) {}

  public async createVideoPost(dto: CreateVideoDto) {
    const post = {...dto, ...this.basePostProperty(), type: PostType.Video, author: '1'};
    return this.savePost(post);
  }

  public async createTextPost(dto: CreateTextDto) {
    const post = {...dto, ...this.basePostProperty(), type: PostType.Text, author: '1'};
    return this.savePost(post);
  }

  public async createQuotePost(dto: CreateQuoteDto) {
    const post = {...dto, ...this.basePostProperty(), type: PostType.Quote, author: '1'};
    return this.savePost(post);
  }

  public async createPhotoPost(dto: CreatePhotoDto) {
    const post = {...dto, ...this.basePostProperty(), type: PostType.Photo, author: '1'};
    return this.savePost(post);
  }

  public async createLinkPost(dto: CreateLinkDto) {
    const post = {...dto, ...this.basePostProperty(), type: PostType.Link, author: '1'};
    return this.savePost(post);
  }

  public async updateVideoPost(id: string, dto: CreateVideoDto) {
    const existPost = await this.getPost(id);
    Object.assign(existPost, dto);
    return this.updatePost(id, existPost);
  }

  public async updateTextPost(id: string, dto: CreateTextDto) {
    const existPost = await this.getPost(id);
    Object.assign(existPost, dto);
    return this.updatePost(id, existPost);
  }

  public async updateQuotePost(id: string, dto: CreateQuoteDto) {
    const existPost = await this.getPost(id);
    Object.assign(existPost, dto);
    return this.updatePost(id, existPost);
  }

  public async updatePhotoPost(id: string, dto: CreatePhotoDto) {
    const existPost = await this.getPost(id);
    Object.assign(existPost, dto);
    return this.updatePost(id, existPost);
  }

  public async updateLinkPost(id: string, dto: CreateLinkDto) {
    const existPost = await this.getPost(id);
    Object.assign(existPost, dto);
    return this.updatePost(id, existPost);
  }

  public async getAll() {
    return this.postRepository.getAll();
  }

  public async getByAuthor(id: string) {
    return this.postRepository.getByUserId(id);
  }

  public async getPost(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return post;
  }

  public async deletePost(id: string) {
    return this.postRepository.destroy(id);
  }

  public postsResponse(posts: PostRdo[]): PostManyRdo {
    return {
      posts,
      totalCount: posts.length,
    }
  }

  private basePostProperty() {
    return {
      status: PostStatus.Publish,
      likeCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      isRepost: false,
    }
  }

  private async savePost(post: IPost): Promise<IPost> {
    const postEntity = new PostEntity(post);
    return this.postRepository.create(postEntity);
  }

  private async updatePost(id: string, post: IPost) {
    const postEntity = new PostEntity(post);
    return this.postRepository.update(id, postEntity);
  }
}
