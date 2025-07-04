import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TaxEntry, TaxEntrySchema } from './tax-entry.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type VoucherEntryDocument = VoucherEntry & Document;

@Schema({ _id: false })
export class VoucherEntry {
  @ApiProperty({ description: 'Ledger ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Ledger' })
  ledger: Types.ObjectId;

  @ApiProperty({ description: 'Entry amount', example: 1000 })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({ description: 'Entry type', enum: ['DEBIT', 'CREDIT'], example: 'DEBIT' })
  @Prop({
    type: String,
    enum: ['DEBIT', 'CREDIT'],
    required: true,
  })
  type: string;

  @ApiPropertyOptional({ description: 'List of tax entry IDs', example: ['665b1c2e5f1b2c3d4e5f6a7b'] })
  @Prop({ type: [TaxEntrySchema] })
  taxes: TaxEntry[];
}

export const VoucherEntrySchema = SchemaFactory.createForClass(VoucherEntry);
