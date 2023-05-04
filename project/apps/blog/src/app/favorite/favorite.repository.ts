import {Injectable} from '@nestjs/common';
import {IFavorite} from '@project/shared/app-types';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class FavoriteRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async create(userId: string, postId: number): Promise<IFavorite> {
    return this.prisma.favorite.create({
      data: {
        userId,
        postId,
      }
    });
  }

  public async findFavorite(userId: string, postId: number): Promise<IFavorite> {
    return this.prisma.favorite.findFirst({
      where: {
        AND: [
          {userId},
          {postId}
        ]
      }
    });
  }

  public async destroy(favoriteId: number): Promise<void> {
    await this.prisma.favorite.delete({
      where: {
        favoriteId,
      }
    })
  }
}
