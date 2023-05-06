import {Injectable} from '@nestjs/common';
import {ICRUDRepository} from '@project/util/util-types';
import {IPost} from '@project/shared/app-types';
import {PostStatus} from '@prisma/client';
import {PaginationQuery, PostQuery, SortingType} from '@project/shared/dto'
import {PostEntity} from './post.entity';
import {PrismaService} from '../prisma/prisma.service';
import {DEFAULT_COMMENTS_COUNT, DEFAULT_POST_COUNT, DEFAULT_SEARCH_COUNT} from './post.constant';

@Injectable()
export class PostRepository implements ICRUDRepository<PostEntity, number, IPost>{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async create(item: PostEntity): Promise<IPost> {
    const entityData = item.toObject();
    return this.prisma.post.create({
      data: {
        ...entityData,
        comments: {connect: []},
        tags: {
          connect: entityData.tags
            .map(({ id }) => ({ id }))
        }
      },
      include: {comments: true, tags: true}
    });
  }

  public async find(query: PostQuery): Promise<IPost[]> {
    const {postType, limit = DEFAULT_POST_COUNT, page, sort, direction, status} = query;
    return this.prisma.post.findMany({
      where: {
        AND: [
          {status: status},
          {postType: postType ?? undefined},
        ]
      },
      include: {tags: true, comments: true},
      orderBy: this.getSorting(sort, direction),
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findById(postId: number): Promise<IPost | null> {
    return this.prisma.post.findFirst({
      where: {
        postId,
      },
      include: {
        tags: true,
        comments: {
          orderBy: {createdAt: 'desc'},
          take: DEFAULT_COMMENTS_COUNT,
        },
      }
    });
  }

  public async findByUserId(userId: string, query: PaginationQuery): Promise<IPost[]> {
    const {limit = DEFAULT_POST_COUNT, page} = query;
    return this.prisma.post.findMany({
      where: {
        AND: [
          {userId},
          {status: PostStatus.publish},
        ]
      },
      include: {tags: true, comments: true},
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    })
  }

  public async findByUserIds(userIds: string[]): Promise<IPost[]> {
    return this.prisma.post.findMany({
      where: {
        AND: [
          {userId: {in: userIds}},
          {status: PostStatus.publish},
        ]
      },
      include: {tags: true, comments: true},
    })
  }

  public async findByTagId(tagId: number, query: PaginationQuery): Promise<IPost[]> {
    const {limit = DEFAULT_POST_COUNT, page} = query;
    return this.prisma.post.findMany({
      where: {
        AND: [
          {status: PostStatus.publish},
          {tags: {some: {id: tagId}}}
        ]
      },
      include: {tags: true, comments: true},
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    })
  }

  public async findDraftByUserId(userId: string): Promise<IPost[]> {
    return this.prisma.post.findMany({
      where: {
        AND: [
          {
            userId
          },
          {
            status: PostStatus.draft,
          }
        ]
      },
      include: {tags: true, comments: true}
    })
  }

  public async findRepost(originalId: number, userId: string): Promise<IPost | null> {
    return this.prisma.post.findFirst({
      where: {
        AND: [
          {userId},
          { originalId}
        ]
      },
      include: {tags: true, comments: true},
    })
  }

  public async search(title: string): Promise<IPost[]> {
    return this.prisma.post.findMany({
      where: {
        AND: [
          {title: {contains: title, mode: 'insensitive'}},
          {status: PostStatus.publish}
        ]
      },
      include: {tags: true, comments: true},
      take: DEFAULT_SEARCH_COUNT,
    })
  }

  public async update(postId: number, item: PostEntity): Promise<IPost> {
    const entityData = item.toObject();
    return this.prisma.post.update({
      where: {postId},
      data: {
        ...entityData,
        comments: {connect: []},
        tags: {
          set: [],
          connect: entityData.tags
            .map(({ id }) => ({ id }))
        }
      },
      include: {comments: true, tags: true}
    });
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  private getSorting(sort: SortingType, direction: 'desc' | 'asc' = 'desc') {
    switch (sort) {
      case SortingType.Likes:
        return {likeCount: direction};
      case SortingType.Comments:
        return {commentCount: direction};
      case SortingType.PublishAt:
        return {publishedAt: direction};
    }
  }
}
