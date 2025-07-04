import { IsString, IsOptional, IsDateString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsString()
  gstin?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value) : value)
  financialYearStart?: Date;

  @IsOptional()
  @IsString()
  address?: string;
}
