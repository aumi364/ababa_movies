import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from './../auth/Guard/jwtGuard';
import { MovieService } from './movie.service';

@UseGuards(JwtGuard)
@Controller('movies')
export class MovieController {
  constructor(
    private MovieService: MovieService,
  ) {}
}
