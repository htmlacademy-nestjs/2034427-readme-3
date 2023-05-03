import {Injectable} from '@nestjs/common';
import {ICRUDRepository} from '@project/util/util-types';
import {IPost} from '@project/shared/app-types';
import {PostStatus} from '@prisma/client';
import {PostEntity} from './post.entity';
import {PrismaService} from '../prisma/prisma.service';
import {PaginationQuery, PostQuery, SortingType} from '@project/shared/dto'

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
        comments: {
          connect: []
        },
        tags: {
          connect: entityData.tags
            .map(({ id }) => ({ id }))
        }
      },
      include: {
        comments: true,
        tags: true,
      }
    });
  }

  public find(query: PostQuery): Promise<IPost[]> {
    const {postType, limit, page, sort, direction, status} = query;
    return this.prisma.post.findMany({
      where: {
        AND: [
          {
            status: status,
          },
          {
            postType: postType ?? undefined,
          },
        ]
      },
      include: {
        tags: true,
        comments: true,
      },
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
        comments: true,
      }
    });
  }

  public getByUserId(userId: string, query: PaginationQuery): Promise<IPost[]> {
    const {limit, page} = query;
    return this.prisma.post.findMany({
      where: {
        userId
      },
      include: {
        tags: true,
        comments: true,
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    })
  }

  public async getByTagId(tagId: number, query: PaginationQuery): Promise<IPost[]> {
    const {limit, page} = query;
    return this.prisma.post.findMany({
      where: {
        tags: {
          some: {
            id: tagId,
          }
        }
      },
      include: {
        tags: true,
        comments: true,
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    })
  }

  public async getDraftByUserId(userId: string): Promise<IPost[]> {
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
      include: {
        tags: true,
        comments: true,
      }
    })
  }

  public async findRepost(originalId: number, userId: string) {
    return this.prisma.post.findFirst({
      where: {
        AND: [
          {
            userId,
          },
          {
            originalId,
          }
        ]
      }
    })
  }

  public update(postId: number, item: PostEntity): Promise<IPost> {
    const entityData = item.toObject();
    return this.prisma.post.update({
      where: {postId},
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        tags: {
          set: [],
          connect: entityData.tags
            .map(({ id }) => ({ id }))
        }
      },
      include: {
        comments: true,
        tags: true,
      }
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
