import {
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class FilterTypeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  filters: string[];
}
