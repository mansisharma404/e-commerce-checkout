import { IOfferConfig } from './offer-config.interface';

export interface IOfferStrategy {
  getProductDiscountedMRP(context: IOfferConfig): number;
}
