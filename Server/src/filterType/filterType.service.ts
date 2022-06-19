import {
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { FilterTypeDto } from '../../dto/filterType/filterType.dto';
import { JwtGuard } from './../auth/Guard/jwtGuard';

@UseGuards(JwtGuard)
@Injectable()
export class FilterTypeService {
  constructor(private prisma: PrismaService) {}
  async create(dto: FilterTypeDto) {
    const {
      filters,
      ...rest
    }: FilterTypeDto & Partial<FilterTypeDto> =
      dto;
    try {
      const filterType =
        await this.prisma.filterType.create({
          data: {
            filters: {
              createMany: {
                data: filters.map((filter) => ({
                  value: filter,
                })),
              },
            },
            ...rest,
          },
        });

      return filterType;
    } catch (error) {
      throw error;
    }
  }
  async get() {
    try {
      const filterTypes =
        await this.prisma.filterType.findMany({
          include: {
            filters: {
              include: {
                movies: {
                  select: {
                    movie: {
                      include: {
                        filters: {
                          select: {
                            filter: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            }, // Return all fields
          },
        });

      return filterTypes;
    } catch (error) {
      throw error;
    }
  }
}
