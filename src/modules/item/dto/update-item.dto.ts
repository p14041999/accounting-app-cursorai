import { IsString, IsOptional, IsNumber, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiPropertyOptional({ description: 'Name of the item', example: 'Laptop' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({ description: 'Item code', example: 'ITM-001' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Group of the item', example: 'Electronics' })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiPropertyOptional({ description: 'Unit of measurement', example: 'pcs' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ description: 'Rate of the item', example: 50000 })
  @IsOptional()
  @IsNumber()
  rate?: number;

  @ApiPropertyOptional({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ description: 'HSN code (TaxCode ID)', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsString()
  hsnCode?: string;
} 