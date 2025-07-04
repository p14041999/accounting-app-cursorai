import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE'],
    required: true,
  })
  action: string;

  @Prop({ required: true })
  entity: string;

  @Prop({ type: Types.ObjectId, required: true })
  entityId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ type: Object })
  changes: any;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
