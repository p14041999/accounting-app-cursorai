import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Company extends Document {
  @ApiProperty({ description: 'Name of the company', example: 'Acme Corp' })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({ description: 'GSTIN number of the company', example: '22AAAAA0000A1Z5' })
  @Prop()
  gstin: string;

  @ApiPropertyOptional({ description: 'Financial year start date', example: '2024-04-01T00:00:00.000Z' })
  @Prop()
  financialYearStart: Date;

  @ApiPropertyOptional({ description: 'Address of the company', example: '123 Main St, Mumbai, India' })
  @Prop()
  address: string;

  @ApiPropertyOptional({ description: 'Currency of the company', default: 'INR', example: 'INR' })
  @Prop({ default: 'INR' })
  currency: string;

  @ApiPropertyOptional({ description: 'Owner user ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Created at timestamp', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export type CompanyDocument = Company;
export const CompanySchema = SchemaFactory.createForClass(Company);
