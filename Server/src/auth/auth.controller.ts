import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthDto } from '../../dto/auth/auth.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthDto) {
    console.log({ dto });
    return this.authService.login(dto);
  }
}
