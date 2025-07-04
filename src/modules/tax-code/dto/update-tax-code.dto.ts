import { IsString, IsNumber, IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaxCodeDto {
  @ApiPropertyOptional({ description: 'HSN/SAC code', example: '9983' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Description of the tax code', example: 'Professional Services' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Tax rate', example: 18 })
  @IsOptional()
  @IsNumber()
  rate?: number;

  @ApiPropertyOptional({ description: 'Type of tax', enum: ['CGST', 'SGST', 'IGST', 'TDS', 'TCS'], example: 'CGST' })
  @IsOptional()
  @IsString()
  @IsIn(['CGST', 'SGST', 'IGST', 'TDS', 'TCS'])
  type?: string;

  @ApiPropertyOptional({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsString()
  company?: string;
} 