import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AccountGroupDocument = AccountGroup & Document;

@Schema({ timestamps: true })
export class AccountGroup {
  @Prop({ required: true })
  name: string;

  @Prop()
  alias: string;

  @Prop({ type: Types.ObjectId, ref: 'AccountGroup' })
  parentGroup: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['ASSET', 'LIABILITY', 'INCOME', 'EXPENSE'],
    required: true,
  })
  nature: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AccountGroupSchema = SchemaFactory.createForClass(AccountGroup);
