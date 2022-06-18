import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FilterTypeService } from './filterType.service';
import { Filter } from '@prisma/client';
import { FilterTypeDto } from './../../dto/filterType.dto';
import { JwtGuard } from './../auth/Guard/jwtGuard';

@UseGuards(JwtGuard)
@Controller('filterTypes')
export class FilterTypeController {
  constructor(
    private filterTypeService: FilterTypeService,
  ) {}

  @Post()
  create(@Body() dto: FilterTypeDto) {
    return this.filterTypeService.create(dto);
  }

  @Get()
  get() {
    return this.filterTypeService.get();
  }
}
