import {
  Get,
  Injectable,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from '../../dto/movie/movie.dto';
import { MovieQueryDto } from './../../dto/movie/movie.query.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(dto: MovieDto) {
    try {
      const movie =
        await this.prisma.movie.create({
          data: {
            name: dto.name,
            filters: {
              create: dto.filterIds.map((id) => ({
                filter: {
                  connect: {
                    id: Number(id),
                  },
                },
              })),
            },
          },
        });
      return movie;
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async get(query: MovieQueryDto, user: User) {
    let movies: any = [];
    const {
      offset,
      limit,
      filter,
      name,
    }: MovieQueryDto = query;
    if (offset && limit) {
      movies = await this.prisma.movie.findMany({
        skip: Number((offset - 1) * limit),
        take: Number(limit),
        include: {
          filters: {
            select: {
              filter: true,
            },
          },
        },
        where: {
          name: {
            contains: name,
          },
        },
      });
    } else {
      movies = await this.prisma.movie.findMany({
        include: {
          filters: {
            select: {
              filter: true,
            },
          },
        },
        where: {
          name: {
            contains: name,
          },
        },
      });
    }

    if (filter) {
      let filterQueries = [];
      if (!Array.isArray(filter)) {
        filterQueries.push(filter);
      } else {
        filterQueries = filter;
      }

      movies = movies.filter((movie: any) =>
        movie.filters.some((filters: any) => {
          return filterQueries.includes(
            filters.filter.value,
          );
        }),
      );
    }

    // const newMovies = movies.map(
    //   async (movie: any) => {
    //     delete movie.filters;
    //     const favorite =
    //       (await this.prisma.favorite.findFirst({
    //         where: {
    //           movieId: Number(movie.id),
    //           userId: Number(user.id),
    //         },
    //       })) || null;
    //     return { ...movie };
    //   },
    // );

    const newMovies = await Promise.all(
      movies.map(async (movie) => {
        delete movie.filters;
        const favorite =
          (await this.prisma.favorite.findFirst({
            where: {
              movieId: Number(movie.id),
              userId: Number(user.id),
            },
            select: {
              id: true,
            },
          })) || null;
        return {
          ...movie,
          favorite,
        };
      }),
    );
    const count = await this.prisma.movie.count();
    return { count: count, data: newMovies };
  }

  @Get()
  async getMovie(params: any, user: User) {
    try {
      const movie =
        await this.prisma.movie.findFirst({
          where: {
            id: Number(params.id),
          },
          include: {
            filters: {
              select: {
                filter: {
                  include: {
                    filterType: true,
                  },
                },
              },
            },
          },
        });
      const favorite =
        (await this.prisma.favorite.findFirst({
          where: {
            movieId: Number(params.id),
            userId: Number(user.id),
          },
          select: {
            id: true,
          },
        })) || null;

      const filterType =
        await this.prisma.filterType.findMany({
          select: {
            code: true,
          },
        });

      const filters = {};

      movie?.filters.forEach(
        ({ filter }: any = {}) => {
          return filterType?.forEach((type) => {
            if (
              type.code ===
              filter?.filterType?.code
            ) {
              if (filters[type.code]) {
                filters[type.code].push(
                  filter?.value,
                );
              } else {
                filters[type.code] = [
                  filter?.value,
                ];
              }
            }
          });
        },
      );
      // const FilterTypeCodes = FilterType.forEach(
      //   (filter) => (filters[filter.code] = []),
      // );
      delete movie.filters;
      const newMovie = {
        ...movie,
        filters,
        favorite,
      };
      return newMovie;
    } catch (error) {
      throw error;
    }
  }
}
