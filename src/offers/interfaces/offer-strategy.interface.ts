import { IOfferConfig } from './offer-config.interface';

export interface IOfferStrategy {
  getProductDiscountAmount(
    validProductId: string,
    context: IOfferConfig,
  ): number;
}
