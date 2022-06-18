import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class FilterDto {
  @IsString()
  @IsNotEmpty()
  filter_code: string;

  @IsString()
  @IsNotEmpty()
  filter_name: string;

  @IsString()
  @IsNotEmpty()
  filter_value: string;
}
