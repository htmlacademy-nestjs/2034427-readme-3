import {Injectable} from '@nestjs/common';
import {IComment} from '@project/shared/app-types';
import {ICRUDRepository} from '@project/util/util-types';
import {PaginationQuery} from '@project/shared/dto';
import {PrismaService} from '../prisma/prisma.service';
import {CommentEntity} from './comment.entity';
import {DEFAULT_COMMENT_COUNT_LIMIT} from './comment.constant';

@Injectable()
export class CommentRepository implements ICRUDRepository<CommentEntity, number, IComment>{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async create(item: CommentEntity): Promise<IComment> {
    return this.prisma.comment.create({
      data: {
        message: item.message,
        userId: item.userId,
        post: {
          connect: {postId: item.postId},
        }
      },
      include: {post: true}
    });
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public async find(query: PaginationQuery, postId: number = null): Promise<IComment[]> {
    const {limit = DEFAULT_COMMENT_COUNT_LIMIT, page} = query;
    return this.prisma.comment.findMany({
      where: {
        post: {
          postId: postId ?? undefined,
        }
      },
      orderBy: {updatedAt: 'desc'},
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    })
  }

  public async findById(commentId: number): Promise<IComment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId,
      }
    })
  }

  public update(commentId: number, item: CommentEntity): Promise<IComment> {
    const entityData = item.toObject();
    return this.prisma.comment.update({
      where: {
        commentId,
      },
      data: {
        ...entityData,
      }
    })
  }
}
