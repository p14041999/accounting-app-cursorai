import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Item extends Document {
  @ApiProperty({ description: 'Name of the item', example: 'Laptop' })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({ description: 'Item code', example: 'ITM-001' })
  @Prop()
  code: string;

  @ApiPropertyOptional({ description: 'Unit of measurement', example: 'pcs' })
  @Prop()
  unit: string;

  @ApiPropertyOptional({ description: 'Group of the item', example: 'Electronics' })
  @Prop()
  group: string;

  @ApiPropertyOptional({ description: 'Rate of the item', example: 50000 })
  @Prop({ default: 0 })
  rate: number;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @ApiPropertyOptional({ description: 'HSN code (TaxCode reference)', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'TaxCode' })
  hsnCode: Types.ObjectId;
}

export type ItemDocument = Item;
export const ItemSchema = SchemaFactory.createForClass(Item);
