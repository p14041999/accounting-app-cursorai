import { IsString, IsOptional, IsDateString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiPropertyOptional({ description: 'Name of the company', minLength: 2, maxLength: 100, example: 'Acme Corp' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({ description: 'GSTIN number of the company', example: '22AAAAA0000A1Z5' })
  @IsOptional()
  @IsString()
  gstin?: string;

  @ApiPropertyOptional({ description: 'Financial year start date (ISO string)', example: '2024-04-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value) : value)
  financialYearStart?: Date;

  @ApiPropertyOptional({ description: 'Address of the company', example: '123 Main St, Mumbai, India' })
  @IsOptional()
  @IsString()
  address?: string;
}
