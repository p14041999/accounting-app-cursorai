import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VoucherEntry, VoucherEntrySchema } from './voucher-entry.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Voucher extends Document {
  @ApiProperty({ description: 'Type of voucher', enum: ['PAYMENT', 'RECEIPT', 'JOURNAL', 'CONTRA', 'SALES', 'PURCHASE'], example: 'PAYMENT' })
  @Prop({
    type: String,
    enum: ['PAYMENT', 'RECEIPT', 'JOURNAL', 'CONTRA', 'SALES', 'PURCHASE'],
    required: true,
  })
  type: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @ApiProperty({ description: 'Voucher date', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ required: true })
  date: Date;

  @ApiPropertyOptional({ description: 'Narration for the voucher', example: 'Payment for invoice #123' })
  @Prop()
  narration: string;

  @ApiProperty({ description: 'Voucher entries', type: [VoucherEntry], example: [{ ledger: '665b1c2e5f1b2c3d4e5f6a7b', amount: 1000, type: 'DEBIT', taxes: [] }] })
  @Prop({ type: [VoucherEntrySchema], required: true })
  entries: VoucherEntry[];

  @ApiPropertyOptional({ description: 'Project ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @ApiPropertyOptional({ description: 'User ID who created the voucher', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Created at timestamp', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export type VoucherDocument = Voucher;
export const VoucherSchema = SchemaFactory.createForClass(Voucher);
