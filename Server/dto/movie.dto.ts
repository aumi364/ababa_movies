import {
  IsNotEmpty,
  IsString,
  IsArray,
} from 'class-validator';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  filterIds: number[];
}
