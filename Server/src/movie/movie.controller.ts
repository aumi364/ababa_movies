import {
  Controller,
  UseGuards,
  Body,
  Post,
  Get,
} from '@nestjs/common';
import { JwtGuard } from './../auth/Guard/jwtGuard';
import { MovieService } from './movie.service';
import { MovieDto } from './../../dto/movie.dto';

@UseGuards(JwtGuard)
@Controller('movies')
export class MovieController {
  constructor(
    private MovieService: MovieService,
  ) {}
  @Post()
  create(@Body() dto: MovieDto) {
    return this.MovieService.create(dto);
  }

  @Get()
  get() {
    return this.MovieService.get();
  }
}
