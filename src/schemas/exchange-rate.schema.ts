import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class ExchangeRate extends Document {
  @ApiProperty({ description: 'Source currency', example: 'USD' })
  @Prop({ required: true })
  fromCurrency: string;

  @ApiProperty({ description: 'Target currency', example: 'INR' })
  @Prop({ required: true })
  toCurrency: string;

  @ApiProperty({ description: 'Exchange rate', example: 82.5 })
  @Prop({ required: true })
  rate: number;

  @ApiProperty({ description: 'Date of the exchange rate', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ required: true })
  date: Date;
}

export type ExchangeRateDocument = ExchangeRate;
export const ExchangeRateSchema = SchemaFactory.createForClass(ExchangeRate);
