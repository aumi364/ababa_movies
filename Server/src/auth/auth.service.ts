import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './../../dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    //find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'Credential not matched',
      );
    }
    const pwMatches = await argon.verify(
      user.password,
      dto.password,
    );
    if (!pwMatches) {
      throw new UnauthorizedException(
        'Password didnt match',
      );
    }

    //send back the user
    return this.signToken(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
    );
  }

  async signToken(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<{
    access_token: string;
    user: object;
  }> {
    const payload = {
      id: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '24h',
        secret: secret,
      },
    );
    return {
      user: {
        id: userId,
        firstName,
        lastName,
        email,
      },
      access_token: token,
    };
  }
}
