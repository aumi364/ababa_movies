import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { FavoriteDto } from 'dto/favorite/favorite.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from './../auth/Guard/jwtGuard';
import { FavoriteService } from './favorite.service';

@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(
    private favoriteService: FavoriteService,
  ) {}
  @Get()
  get(@GetUser() user: User) {
    return this.favoriteService.get(user);
  }
  @Post()
  post(
    @Body() dto: FavoriteDto,
    @GetUser() user: User,
  ) {
    return this.favoriteService.create(dto, user);
  }
}
