import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LedgerDocument = Ledger & Document;

@Schema({ timestamps: true })
export class Ledger {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AccountGroup' })
  group: Types.ObjectId;

  @Prop({ default: 0 })
  openingBalance: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LedgerSchema = SchemaFactory.createForClass(Ledger);
