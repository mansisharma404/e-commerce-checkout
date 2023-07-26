import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
  @Prop({ required: true })
  entity: string;

  @Prop({ required: true })
  max: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);

CounterSchema.index({ entity: 1 }, { unique: true });
