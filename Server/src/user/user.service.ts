import {
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './../../dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}
  async create(dto: AuthDto) {
    const password = await argon.hash(
      dto.password,
    );
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
        },
      });

      return this.auth.signToken(
        user.id,
        user.email,
        user.firstName,
        user.lastName,
      );
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new NotAcceptableException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }
}
