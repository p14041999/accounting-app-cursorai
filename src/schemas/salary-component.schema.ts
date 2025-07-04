import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class SalaryComponent extends Document {
  @ApiProperty({ description: 'Name of the salary component', example: 'Basic' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Amount of the salary component', example: 20000 })
  @Prop({ required: true })
  amount: number;
}

export type SalaryComponentDocument = SalaryComponent;
export const SalaryComponentSchema = SchemaFactory.createForClass(SalaryComponent);
