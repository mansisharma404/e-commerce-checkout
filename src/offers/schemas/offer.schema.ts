import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OfferStrategyEnum } from '../enums/offerStrategy.enum';
import { IOfferConfig } from '../interfaces/offer-config.interface';

export type OfferDocument = Offer & Document;

@Schema({ timestamps: true })
export class Offer {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  applicableOnProductId?: string;

  @Prop({ required: false })
  retailerId: string;

  @Prop({ required: true })
  offerStrategy: OfferStrategyEnum;

  @Prop({ required: true, type: Object })
  offerConfig: IOfferConfig;

  @Prop({ required: true })
  isActive: boolean;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
