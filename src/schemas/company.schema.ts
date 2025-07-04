import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop()
  gstin: string;

  @Prop()
  financialYearStart: Date;

  @Prop()
  address: string;

  @Prop({ default: 'INR' })
  currency: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
