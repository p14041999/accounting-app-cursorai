import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaxEntryDocument = TaxEntry & Document;

@Schema({ _id: false })
export class TaxEntry {
  @Prop({ type: Types.ObjectId, ref: 'TaxCode' })
  taxCode: Types.ObjectId;

  @Prop({ required: true })
  amount: number;
}

export const TaxEntrySchema = SchemaFactory.createForClass(TaxEntry);
