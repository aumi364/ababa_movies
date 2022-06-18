import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { FilterTypeModule } from './filterType/filterType.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FavoriteModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MovieModule,
    FilterTypeModule,
  ],
})
export class AppModule {}
