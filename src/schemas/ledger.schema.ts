import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Ledger extends Document {
  @ApiProperty({ description: 'Name of the ledger', example: 'Cash' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @ApiProperty({ description: 'Account group ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'AccountGroup' })
  group: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Opening balance', example: 10000 })
  @Prop({ default: 0 })
  openingBalance: number;

  @ApiPropertyOptional({ description: 'User ID who created the ledger', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Created at timestamp', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export type LedgerDocument = Ledger;
export const LedgerSchema = SchemaFactory.createForClass(Ledger);
