import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { MovieDto } from '../../dto/movie/movie.dto';
import { MovieQueryDto } from './../../dto/movie/movie.query.dto';
import { JwtGuard } from './../auth/Guard/jwtGuard';
import { MovieService } from './movie.service';

@UseGuards(JwtGuard)
@Controller('movies')
export class MovieController {
  constructor(
    private movieService: MovieService,
  ) {}
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Get('?')
  get(
    @Query() query: MovieQueryDto,
    @GetUser() user: User,
  ) {
    return this.movieService.get(query, user);
  }
  @Get(':id')
  getMovie(
    @Param() params,
    @GetUser() user: User,
  ): any {
    return this.movieService.getMovie(
      params,
      user,
    );
  }
}
