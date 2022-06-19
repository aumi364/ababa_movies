import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { FilterDto } from '../../dto/filter/filter.dto';
import { FilterService } from './filter.service';

@Controller('filters')
export class FilterController {
  constructor(
    private filterService: FilterService,
  ) {}

  @Post()
  create(@Body() dto: FilterDto) {
    return this.filterService.create(dto);
  }

  @Get()
  findAll() {
    return this.filterService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filterService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filterService.remove(+id);
  // }
}
