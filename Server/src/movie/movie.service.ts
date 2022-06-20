import {
  Get,
  Injectable,
  Post,
} from '@nestjs/common';
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
  async get(query: MovieQueryDto) {
    let movies: any = [];
    const {
      offset,
      limit,
      filter,
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

    movies.forEach(
      (movie: any) => delete movie.filters,
    );
    return movies;
  }

  @Get()
  async getMovie(params: any) {
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
      const newMovie = { ...movie, filters };
      return newMovie;
    } catch (error) {
      throw error;
    }
  }
}
