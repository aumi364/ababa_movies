import {
  Get,
  Injectable,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { FavoriteDto } from 'dto/favorite/favorite.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async get(user: User) {
    try {
      const favorites =
        await this.prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            favorites: {
              where: {
                userId: user.id,
              },
              include: {
                movie: true,
              },
            },
          },
        });
      return favorites;
    } catch (error) {
      throw error;
    }
  }

  async create(dto: FavoriteDto, user: User) {
    try {
      const alreadyExists =
        await this.prisma.favorite.findFirst({
          where: {
            movieId: Number(dto.movieId),
            userId: Number(user.id),
          },
        });

      if (alreadyExists) {
        const favorite =
          await this.prisma.favorite.delete({
            where: {
              id: alreadyExists.id,
            },
          });
        return {
          message: 'deleted successfully',
        };
      } else {
        const favorite =
          await this.prisma.favorite.create({
            data: {
              movieId: Number(dto.movieId),
              userId: Number(user.id),
            },
          });
        return favorite;
      }
    } catch (error) {
      throw error;
    }
  }
}
