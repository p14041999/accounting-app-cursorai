import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankReconciliationDocument = BankReconciliation & Document;

@Schema({ timestamps: true })
export class BankReconciliation {
  @Prop({ type: Types.ObjectId, ref: 'Ledger' })
  bankLedger: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({
    type: String,
    enum: ['DEBIT', 'CREDIT'],
    required: true,
  })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Voucher' })
  matchedVoucher: Types.ObjectId;

  @Prop({ default: false })
  cleared: boolean;

  @Prop()
  note: string;
}

export const BankReconciliationSchema =
  SchemaFactory.createForClass(BankReconciliation);
