import { Injectable } from '@nestjs/common';
import { FilterDto } from 'dto/filter/filter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilterService {
  constructor(private prisma: PrismaService) {}
  async create(dto: FilterDto) {
    console.log(dto);
    !dto.filterTypeId && delete dto.filterTypeId;
    try {
      const filter =
        await this.prisma.filter.create({
          data: {
            value: dto.value,
            filterTypeId: Number(
              dto.filterTypeId,
            ),
          },
        });
      return filter;
    } catch (e) {
      throw e;
    }
  }

  async get() {
    try {
      const filter =
        await this.prisma.filter.findMany();
      return filter;
    } catch (e) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} filter`;
  }

  // update(id: number, updateFilterDto: UpdateFilterDto) {
  //   return `This action updates a #${id} filter`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} filter`;
  // }
}
