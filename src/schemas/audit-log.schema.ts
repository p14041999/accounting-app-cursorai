import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class AuditLog extends Document {
  @ApiProperty({ description: 'Action performed', enum: ['CREATE', 'UPDATE', 'DELETE'], example: 'CREATE' })
  @Prop({ type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true })
  action: string;

  @ApiProperty({ description: 'Entity name', example: 'Company' })
  @Prop({ required: true })
  entity: string;

  @ApiProperty({ description: 'Entity ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, required: true })
  entityId: Types.ObjectId;

  @ApiPropertyOptional({ description: 'User ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Timestamp', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  timestamp: Date;

  @ApiPropertyOptional({ description: 'Changes made', example: { field: 'name', old: 'A', new: 'B' } })
  @Prop({ type: Object })
  changes: any;
}

export type AuditLogDocument = AuditLog;
export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
