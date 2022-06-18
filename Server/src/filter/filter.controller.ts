import {
  Controller,
  Body,
  Post,
} from '@nestjs/common';
import { FilterService } from './filter.service';

import { FilterDto } from './../../dto/filter.dto';
@Controller('filters')
export class FilterController {
  constructor(
    private filterService: FilterService,
  ) {}

  @Post()
  create(@Body() dto: FilterDto) {
    return this.filterService.create(dto);
  }
}
