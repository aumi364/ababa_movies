import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FilterTypeDto } from '../../dto/filterType/filterType.dto';
import { JwtGuard } from './../auth/Guard/jwtGuard';
import { FilterTypeService } from './filterType.service';

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
