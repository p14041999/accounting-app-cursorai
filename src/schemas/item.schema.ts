import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop()
  unit: string;

  @Prop()
  group: string;

  @Prop({ default: 0 })
  rate: number;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
