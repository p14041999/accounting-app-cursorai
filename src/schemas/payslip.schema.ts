import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  SalaryComponent,
  SalaryComponentSchema,
} from './salary-component.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Payslip extends Document {
  @ApiProperty({ description: 'Employee ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  employee: Types.ObjectId;

  @ApiProperty({ description: 'Salary components', type: [SalaryComponent], example: [{ name: 'Basic', amount: 20000 }] })
  @Prop({ type: [SalaryComponentSchema] })
  salaryComponents: SalaryComponent[];

  @ApiProperty({ description: 'Month', example: 4 })
  @Prop({ required: true })
  month: number;

  @ApiProperty({ description: 'Year', example: 2024 })
  @Prop({ required: true })
  year: number;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;
}

export type PayslipDocument = Payslip;
export const PayslipSchema = SchemaFactory.createForClass(Payslip);
