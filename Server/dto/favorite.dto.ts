import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class FavoriteDto {
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
