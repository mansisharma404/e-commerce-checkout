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
  applicableOnProductId?: Array<string>;

  @Prop({ required: false })
  retailerId: string;

  @Prop({ required: true })
  offerStrategy: OfferStrategyEnum;

  @Prop({ required: true })
  multipleDifferentOfferApplicable: boolean;

  @Prop({ required: true })
  offerConfig: IOfferConfig;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
