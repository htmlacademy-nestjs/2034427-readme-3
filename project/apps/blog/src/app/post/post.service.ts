import {Injectable, NotFoundException,} from '@nestjs/common';
import {IPost} from '@project/shared/app-types';
import {PostType} from '@prisma/client';
import {PostRepository} from './post.repository';
import {TagRepository} from '../tag/tag.repository';
import {CreateVideoDto} from './dto/create-video.dto';
import {PostEntity} from './post.entity';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {POST_NOT_FOUND} from './post.constant';
import {PostQuery} from './query/post.query';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async createVideoPost(dto: CreateVideoDto): Promise<IPost> {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, comments: [], postType: PostType.video});
    return this.postRepository.create(postEntity);
  }

  public async createTextPost(dto: CreateTextDto): Promise<IPost> {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, comments: [], postType: PostType.text});
    return this.postRepository.create(postEntity);
  }

  public async createQuotePost(dto: CreateQuoteDto): Promise<IPost> {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, comments: [], postType: PostType.text});
    return this.postRepository.create(postEntity);
  }

  public async createPhotoPost(dto: CreatePhotoDto): Promise<IPost> {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, comments: [], postType: PostType.photo});
    return this.postRepository.create(postEntity);
  }

  public async createLinkPost(dto: CreateLinkDto): Promise<IPost> {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, comments: [], postType: PostType.link});
    return this.postRepository.create(postEntity);
  }

  public async updateVideoPost(id: number, dto: CreateVideoDto) {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType: PostType.video});
    return this.postRepository.update(id, postEntity);
  }

  public async updateTextPost(id: number, dto: CreateTextDto) {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType: PostType.text});
    return this.postRepository.update(id, postEntity);
  }

  public async updateQuotePost(id: number, dto: CreateQuoteDto) {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType: PostType.quote});
    return this.postRepository.update(id, postEntity);
  }

  public async updatePhotoPost(id: number, dto: CreatePhotoDto) {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType: PostType.photo});
    return this.postRepository.update(id, postEntity);
  }

  public async updateLinkPost(id: number, dto: CreateLinkDto) {
    const tags = await this.tagRepository.findByIds(dto.tags);
    const postEntity = new PostEntity({...dto, tags, postType: PostType.link});
    return this.postRepository.update(id, postEntity);
  }

  public async getAll(query: PostQuery): Promise<IPost[]> {
    return this.postRepository.find(query);
  }

  public async getByAuthor(userId: string): Promise<IPost[]> {
    return this.postRepository.getByUserId(userId);
  }

  public async getPost(id: number): Promise<IPost> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return post;
  }

  public async deletePost(id: number): Promise<void> {
    await this.postRepository.destroy(id);
  }
}
