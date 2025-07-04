import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Project extends Document {
  @ApiProperty({ description: 'Name of the project', example: 'ERP Implementation' })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({ description: 'Description of the project', example: 'Implementing ERP for client' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Company ID', example: '665b1c2e5f1b2c3d4e5f6a7b' })
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Project start date', example: '2024-04-01T00:00:00.000Z' })
  @Prop()
  startDate: Date;

  @ApiPropertyOptional({ description: 'Project end date', example: '2024-10-01T00:00:00.000Z' })
  @Prop()
  endDate: Date;
}

export type ProjectDocument = Project;
export const ProjectSchema = SchemaFactory.createForClass(Project);
