import {
  Get,
  Injectable,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './../../dto/movie.dto';

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
  get() {
    return 'hello';
  }
}
