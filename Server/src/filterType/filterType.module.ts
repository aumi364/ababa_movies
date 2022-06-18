import { Module } from '@nestjs/common';
import { FilterTypeService } from './filterType.service';
import { FilterTypeController } from './filterType.controller';

@Module({
  providers: [FilterTypeService],
  controllers: [FilterTypeController],
})
export class FilterTypeModule {}
