import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class BankReconciliation extends Document {
  @ApiProperty({ description: 'Bank ledger ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Ledger' })
  bankLedger: Types.ObjectId;

  @ApiProperty({ description: 'Date of reconciliation', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ description: 'Amount', example: 5000 })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({ description: 'Type of entry', enum: ['DEBIT', 'CREDIT'], example: 'DEBIT' })
  @Prop({ type: String, enum: ['DEBIT', 'CREDIT'], required: true })
  type: string;

  @ApiPropertyOptional({ description: 'Matched voucher ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Voucher' })
  matchedVoucher: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Cleared status', example: false })
  @Prop({ default: false })
  cleared: boolean;

  @ApiPropertyOptional({ description: 'Note', example: 'Cleared on 2024-04-10' })
  @Prop()
  note: string;
}

export type BankReconciliationDocument = BankReconciliation;
export const BankReconciliationSchema = SchemaFactory.createForClass(BankReconciliation);
