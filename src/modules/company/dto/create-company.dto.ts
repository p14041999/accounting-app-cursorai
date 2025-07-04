import { IsString, IsOptional, IsDateString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name of the company', minLength: 2, maxLength: 100, example: 'Acme Corp' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiPropertyOptional({ description: 'GSTIN number of the company', example: '22AAAAA0000A1Z5' })
  @IsOptional()
  @IsString()
  gstin?: string;

  @ApiProperty({ description: 'Financial year start date (ISO string)', example: '2024-04-01T00:00:00.000Z' })
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  financialYearStart: Date;

  @ApiPropertyOptional({ description: 'Address of the company', example: '123 Main St, Mumbai, India' })
  @IsOptional()
  @IsString()
  address?: string;
}
