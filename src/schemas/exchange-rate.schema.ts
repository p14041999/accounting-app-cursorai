import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExchangeRateDocument = ExchangeRate & Document;

@Schema({ timestamps: true })
export class ExchangeRate {
  @Prop({ required: true })
  fromCurrency: string;

  @Prop({ required: true })
  toCurrency: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  date: Date;
}

export const ExchangeRateSchema = SchemaFactory.createForClass(ExchangeRate);
