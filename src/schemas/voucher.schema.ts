import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VoucherEntry, VoucherEntrySchema } from './voucher-entry.schema';

export type VoucherDocument = Voucher & Document;

@Schema({ timestamps: true })
export class Voucher {
  @Prop({
    type: String,
    enum: ['PAYMENT', 'RECEIPT', 'JOURNAL', 'CONTRA', 'SALES', 'PURCHASE'],
    required: true,
  })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop()
  narration: string;

  @Prop({ type: [VoucherEntrySchema], required: true })
  entries: VoucherEntry[];

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
