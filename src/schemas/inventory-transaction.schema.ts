import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class InventoryTransaction extends Document {
  @ApiProperty({ description: 'Item ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Item' })
  item: Types.ObjectId;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @ApiProperty({ description: 'Voucher ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Voucher' })
  voucher: Types.ObjectId;

  @ApiProperty({ description: 'Quantity', example: 10 })
  @Prop({ required: true })
  quantity: number;

  @ApiProperty({ description: 'Rate', example: 500 })
  @Prop({ required: true })
  rate: number;

  @ApiProperty({ description: 'Transaction type', enum: ['IN', 'OUT'], example: 'IN' })
  @Prop({ type: String, enum: ['IN', 'OUT'], required: true })
  type: string;

  @ApiProperty({ description: 'Transaction date', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ required: true })
  date: Date;
}

export type InventoryTransactionDocument = InventoryTransaction;
export const InventoryTransactionSchema = SchemaFactory.createForClass(InventoryTransaction);
