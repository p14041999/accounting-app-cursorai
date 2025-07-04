import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type TaxCodeDocument = TaxCode & Document;

@Schema({ timestamps: true })
export class TaxCode {
  @ApiPropertyOptional({ description: 'HSN/SAC code', example: '9983' })
  @Prop()
  code: string; // HSN/SAC

  @ApiPropertyOptional({ description: 'Description of the tax code', example: 'Professional Services' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Tax rate', example: 18 })
  @Prop({ required: true })
  rate: number;

  @ApiProperty({ description: 'Type of tax', enum: ['CGST', 'SGST', 'IGST', 'TDS', 'TCS'], example: 'CGST' })
  @Prop({
    type: String,
    enum: ['CGST', 'SGST', 'IGST', 'TDS', 'TCS'],
    required: true,
  })
  type: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;
}

export const TaxCodeSchema = SchemaFactory.createForClass(TaxCode);
