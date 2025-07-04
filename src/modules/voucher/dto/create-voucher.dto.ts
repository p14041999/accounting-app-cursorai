import { IsString, IsDateString, IsOptional, IsArray, ValidateNested, IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class VoucherEntryDto {
  @ApiProperty({ description: 'Ledger ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsMongoId()
  ledgerId: string;

  @ApiProperty({ description: 'Entry amount', example: 1000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Entry type', enum: ['DEBIT', 'CREDIT'], example: 'DEBIT' })
  @IsEnum(['DEBIT', 'CREDIT'])
  type: 'DEBIT' | 'CREDIT';
}

export class CreateVoucherDto {
  @ApiProperty({ description: 'Type of voucher', enum: ['PAYMENT', 'RECEIPT', 'JOURNAL', 'CONTRA', 'SALES', 'PURCHASE'], example: 'PAYMENT' })
  @IsEnum(['PAYMENT', 'RECEIPT', 'JOURNAL', 'CONTRA', 'SALES', 'PURCHASE'])
  type: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @IsMongoId()
  companyId: string;

  @ApiProperty({ description: 'Voucher date', example: '2024-04-01T00:00:00.000Z' })
  @IsDateString()
  date: Date;

  @ApiPropertyOptional({ description: 'Narration for the voucher', example: 'Payment for invoice #123' })
  @IsOptional()
  @IsString()
  narration?: string;

  @ApiProperty({ description: 'Voucher entries', type: [VoucherEntryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VoucherEntryDto)
  entries: VoucherEntryDto[];
}
