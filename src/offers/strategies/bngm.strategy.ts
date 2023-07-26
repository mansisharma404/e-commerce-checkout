import { HttpException, HttpStatus } from '@nestjs/common';
import { IOfferConfig } from '../interfaces/offer-config.interface';
import { IOfferStrategy } from '../interfaces/offer-strategy.interface';

export class bngmStrategy implements IOfferStrategy {
  getProductDiscountedMRP(context: IOfferConfig): number {
    if (context.products == undefined)
      throw new HttpException(
        `Offer not configured yet - ${context}`,
        HttpStatus.BAD_REQUEST,
      );
    if (context.buyN == undefined || context.getM == undefined)
      throw new HttpException(
        `Offer not configured correctly - ${context}`,
        HttpStatus.BAD_REQUEST,
      );

    let discountedMRP = 0;
    for (let i = 0; i < context.products.length; i++) {
      const minimumUnits =
        context.products[i].units / (context.buyN + context.getM);
      const extra = context.products[i].units % (context.buyN + context.getM);
      discountedMRP += (minimumUnits + extra) * context.products[i].mrp;
    }

    return discountedMRP;
  }
}
