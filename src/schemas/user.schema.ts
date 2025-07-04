import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Password hash of the user', example: 'hashedpassword123' })
  @Prop({ required: true })
  passwordHash: string;

  @ApiProperty({ description: 'Role of the user', enum: ['ADMIN', 'ACCOUNTANT', 'AUDITOR'], example: 'ADMIN' })
  @Prop({
    type: String,
    enum: ['ADMIN', 'ACCOUNTANT', 'AUDITOR'],
    required: true,
  })
  role: string;

  @ApiPropertyOptional({ description: 'List of company IDs the user is associated with', example: ['665b1c2e5f1b2c3d4e5f6a7b'] })
  @Prop({ type: [Types.ObjectId], ref: 'Company' })
  companies: Types.ObjectId[];

  @ApiPropertyOptional({ description: 'Created at timestamp', example: '2024-04-01T00:00:00.000Z' })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
