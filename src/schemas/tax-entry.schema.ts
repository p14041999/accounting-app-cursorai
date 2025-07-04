import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class TaxEntry extends Document {
  @ApiProperty({ description: 'Tax code ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'TaxCode' })
  taxCode: Types.ObjectId;

  @ApiProperty({ description: 'Tax amount', example: 180 })
  @Prop({ required: true })
  amount: number;
}

export type TaxEntryDocument = TaxEntry;
export const TaxEntrySchema = SchemaFactory.createForClass(TaxEntry);
