import { IsString, IsOptional, IsDateString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsOptional()
  @IsString()
  gstin?: string;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  financialYearStart: Date;

  @IsOptional()
  @IsString()
  address?: string;
}
