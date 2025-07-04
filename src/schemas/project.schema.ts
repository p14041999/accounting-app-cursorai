import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
