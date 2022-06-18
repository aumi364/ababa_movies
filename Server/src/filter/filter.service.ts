import {
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { FilterDto } from './../../dto/filter.dto';
import { JwtGuard } from './../auth/Guard/jwtGuard';

@UseGuards(JwtGuard)
@Injectable()
export class FilterService {
  constructor(private prisma: PrismaService) {}
  async create(dto: FilterDto) {
    try {
      const filter =
        await this.prisma.filter.create({
          data: { ...dto },
        });
      return filter;
    } catch (error) {
      throw error;
    }
  }
  async get(dto: FilterDto) {
    try {
      const filters =
        await this.prisma.filter.findMany();
      return filters;
    } catch (error) {
      return error;
    }
  }
}
