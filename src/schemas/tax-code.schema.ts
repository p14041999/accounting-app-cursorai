import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaxCodeDocument = TaxCode & Document;

@Schema({ timestamps: true })
export class TaxCode {
  @Prop()
  code: string; // HSN/SAC

  @Prop()
  description: string;

  @Prop({ required: true })
  rate: number;

  @Prop({
    type: String,
    enum: ['CGST', 'SGST', 'IGST', 'TDS', 'TCS'],
    required: true,
  })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;
}

export const TaxCodeSchema = SchemaFactory.createForClass(TaxCode);
