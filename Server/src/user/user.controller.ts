import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthDto } from 'dto/auth.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(@Body() dto: AuthDto) {
    return this.userService.create(dto);
  }
}
