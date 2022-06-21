import {
  IsNotEmpty,
  IsString,
  IsArray,
} from 'class-validator';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsArray()
  @IsNotEmpty()
  filterIds: number[];
}
