import { IsString, IsDateString, IsOptional, IsArray, ValidateNested, IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

class VoucherEntryDto {
  @ApiPropertyOptional({ description: 'Ledger ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsMongoId()
  ledgerId?: string;

  @ApiPropertyOptional({ description: 'Entry amount', example: 1000 })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ description: 'Entry type', enum: ['DEBIT', 'CREDIT'], example: 'DEBIT' })
  @IsOptional()
  @IsEnum(['DEBIT', 'CREDIT'])
  type?: 'DEBIT' | 'CREDIT';
}

export class UpdateVoucherDto {
  @ApiPropertyOptional({ description: 'Type of voucher', enum: ['PAYMENT', 'RECEIPT', 'JOURNAL', 'CONTRA', 'SALES', 'PURCHASE'], example: 'PAYMENT' })
  @IsOptional()
  @IsEnum(['PAYMENT', 'RECEIPT', 'JOURNAL', 'CONTRA', 'SALES', 'PURCHASE'])
  type?: string;

  @ApiPropertyOptional({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsOptional()
  @IsMongoId()
  companyId?: string;

  @ApiPropertyOptional({ description: 'Voucher date', example: '2024-04-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiPropertyOptional({ description: 'Narration for the voucher', example: 'Payment for invoice #123' })
  @IsOptional()
  @IsString()
  narration?: string;

  @ApiPropertyOptional({ description: 'Voucher entries', type: [VoucherEntryDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VoucherEntryDto)
  entries?: VoucherEntryDto[];
}
