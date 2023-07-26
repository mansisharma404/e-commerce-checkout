import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RetailerDocument = Retailer & Document;

@Schema({ timestamps: true })
export class Retailer {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    validate: (value: string): boolean => {
      if (value === undefined) return true;
      return new RegExp(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$',
      ).test(value);
    },
    required: false,
  })
  email?: string;

  @Prop({
    validate: (value: string): boolean => {
      if (value === undefined) return true;
      return new RegExp('^([6-9]{1})([0-9]{9})$').test(value);
    },
    required: false,
  })
  mobile?: string;

  @Prop()
  createdAt?: Date;
}

export const RetailerSchema = SchemaFactory.createForClass(Retailer);
