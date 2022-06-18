import {
  Get,
  Injectable,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  @Post()
  create() {
    return 'hello';
  }

  @Get()
  get() {
    return 'hello';
  }
}
