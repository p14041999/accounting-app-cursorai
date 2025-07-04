import { IsString, IsOptional, IsNumber, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLedgerDto {
  @ApiPropertyOptional({ description: 'Name of the ledger', example: 'Cash' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ description: 'Account group ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsString()
  groupId?: string;

  @ApiPropertyOptional({ description: 'Opening balance', example: 10000 })
  @IsOptional()
  @IsNumber()
  openingBalance?: number;
}
