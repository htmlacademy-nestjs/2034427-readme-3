import {Injectable} from '@nestjs/common';
import {ICRUDRepository} from '@project/util/util-types';
import {IPost} from '@project/shared/app-types';
import {PostQuery, SortingType} from './query/post.query';
import {PostEntity} from './post.entity';
import {PrismaService} from '../prisma/prisma.service';

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

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
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

  public find(query: PostQuery): Promise<IPost[]> {
    const {userId, tag, postType, limit, page, sort, direction, status} = query;
    return this.prisma.post.findMany({
      where: {
        AND: [
          {
            status: status,
          },
          {
            userId: userId ?? undefined,
          },
          {
            postType: postType ?? undefined,
          },
          {
            tags: {
              some: {
                title: tag ?? undefined
              }
            }
          }
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

  public getByUserId(userId: string): Promise<IPost[]> {
    return this.prisma.post.findMany({
      where: {
        userId
      },
      include: {
        tags: true,
        comments: true,
      }
    })
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
