import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalaryComponentDocument = SalaryComponent & Document;

@Schema({ _id: false })
export class SalaryComponent {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;
}

export const SalaryComponentSchema =
  SchemaFactory.createForClass(SalaryComponent);
