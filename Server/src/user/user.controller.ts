import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto } from 'dto/auth/auth.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from './../auth/Guard/jwtGuard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() dto: AuthDto) {
    return this.userService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  get(@GetUser() user: User) {
    return user;
  }
}
