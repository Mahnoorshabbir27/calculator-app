import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class History {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  expression: string;

  @Prop({ required: true, type: Number })
  result: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);
