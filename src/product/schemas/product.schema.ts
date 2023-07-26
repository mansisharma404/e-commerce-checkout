import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  productType: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  image?: string;

  @Prop({ required: true })
  mrp: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  retailerId: string;

  @Prop({ required: true })
  availableUnits: number;

  @Prop()
  createdAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
