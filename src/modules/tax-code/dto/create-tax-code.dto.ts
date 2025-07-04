import { IsString, IsNumber, IsIn, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaxCodeDto {
  @ApiProperty({ description: 'HSN/SAC code', example: '9983' })
  @IsString()
  code: string;

  @ApiPropertyOptional({ description: 'Description of the tax code', example: 'Professional Services' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Tax rate', example: 18 })
  @IsNumber()
  rate: number;

  @ApiProperty({ description: 'Type of tax', enum: ['CGST', 'SGST', 'IGST', 'TDS', 'TCS'], example: 'CGST' })
  @IsString()
  @IsIn(['CGST', 'SGST', 'IGST', 'TDS', 'TCS'])
  type: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsString()
  company: string;
} 