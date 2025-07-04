import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Employee extends Document {
  @ApiProperty({ description: 'Name of the employee', example: 'Jane Smith' })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({ description: 'Employee code', example: 'EMP-001' })
  @Prop()
  employeeCode: string;

  @ApiPropertyOptional({ description: 'Department of the employee', example: 'HR' })
  @Prop()
  department: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;
}

export type EmployeeDocument = Employee;
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
