import {
  IsOptional,
  IsString,
} from 'class-validator';

export class MovieQueryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  filter: string[];

  @IsOptional()
  offset: number;

  @IsOptional()
  limit: number;
}
