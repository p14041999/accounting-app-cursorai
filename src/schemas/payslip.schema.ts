import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  SalaryComponent,
  SalaryComponentSchema,
} from './salary-component.schema';

export type PayslipDocument = Payslip & Document;

@Schema({ timestamps: true })
export class Payslip {
  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  employee: Types.ObjectId;

  @Prop({ type: [SalaryComponentSchema] })
  salaryComponents: SalaryComponent[];

  @Prop({ required: true })
  month: number;

  @Prop({ required: true })
  year: number;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;
}

export const PayslipSchema = SchemaFactory.createForClass(Payslip);
