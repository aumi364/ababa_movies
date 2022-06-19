import {
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class FilterDto {
  @IsNotEmpty()
  value: string;

  @IsOptional()
  filterTypeId: number;
}
