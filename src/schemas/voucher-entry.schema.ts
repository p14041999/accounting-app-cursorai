import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TaxEntry, TaxEntrySchema } from './tax-entry.schema';

export type VoucherEntryDocument = VoucherEntry & Document;

@Schema({ _id: false })
export class VoucherEntry {
  @Prop({ type: Types.ObjectId, ref: 'Ledger' })
  ledger: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({
    type: String,
    enum: ['DEBIT', 'CREDIT'],
    required: true,
  })
  type: string;

  @Prop({ type: [TaxEntrySchema] })
  taxes: TaxEntry[];
}

export const VoucherEntrySchema = SchemaFactory.createForClass(VoucherEntry);
