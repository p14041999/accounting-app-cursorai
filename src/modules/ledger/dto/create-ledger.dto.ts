import { IsString, IsOptional, IsNumber, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLedgerDto {
  @ApiProperty({ description: 'Name of the ledger', example: 'Cash' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsString()
  companyId: string;

  @ApiProperty({ description: 'Account group ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsString()
  groupId: string;

  @ApiPropertyOptional({ description: 'Opening balance', example: 10000 })
  @IsOptional()
  @IsNumber()
  openingBalance?: number;
}
