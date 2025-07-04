import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class AccountGroup extends Document {
  @ApiProperty({ description: 'Name of the account group', example: 'Current Assets' })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({ description: 'Alias for the account group', example: 'Assets' })
  @Prop()
  alias: string;

  @ApiPropertyOptional({ description: 'Parent group ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'AccountGroup' })
  parentGroup: Types.ObjectId;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Types.ObjectId;

  @ApiProperty({ description: 'Nature of the group', enum: ['ASSET', 'LIABILITY', 'INCOME', 'EXPENSE'], example: 'ASSET' })
  @Prop({ type: String, enum: ['ASSET', 'LIABILITY', 'INCOME', 'EXPENSE'], required: true })
  nature: string;

  @ApiPropertyOptional({ description: 'Created at timestamp', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export type AccountGroupDocument = AccountGroup;
export const AccountGroupSchema = SchemaFactory.createForClass(AccountGroup);
