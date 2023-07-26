import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

export type UserDocument = User & Document;

export class Cart {
  totalMrp?: number;
  orderedProducts?: Array<Record<string, any>>;
  deliveryCharge?: number;
  hiddenCharges?: number;
  payableAmountBeforeDiscount?: number;
  offerApplied?: Array<Record<string, any>>;
  discount?: number;
  netPayableAmount?: number;
}

@Schema({ timestamps: true })
export class User {
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

  @Prop({ required: false })
  cart?: Cart;

  @Prop()
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
