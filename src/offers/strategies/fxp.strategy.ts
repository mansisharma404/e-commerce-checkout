import { HttpException, HttpStatus } from '@nestjs/common';
import { IOfferConfig } from '../interfaces/offer-config.interface';
import { IOfferStrategy } from '../interfaces/offer-strategy.interface';

export class fxpStrategy implements IOfferStrategy {
  getProductDiscountAmount(
    validProductId: string,
    context: IOfferConfig,
  ): number {
    if (context.productsInCart == undefined)
      throw new HttpException(
        `No product to apply offer - ${context}`,
        HttpStatus.BAD_REQUEST,
      );
    if (context.minimumOrderValue != undefined) {
      throw new HttpException(
        `Offer not configured yet - ${context}`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (
      context.minimumProductCount != undefined &&
      context.discountPercent != undefined
    ) {
      const cartItems = context.productsInCart;
      const eligibleDiscountItemsList = cartItems.filter((item) => {
        return item.productId == validProductId;
      });
      if (eligibleDiscountItemsList.length == 0) return 0;
      const eligibleProductDetails = eligibleDiscountItemsList[0];
      if (eligibleProductDetails.units < context.minimumProductCount) return 0;
      return (
        eligibleProductDetails.mrp *
        eligibleProductDetails.units *
        (context.discountPercent / 100)
      );
    }
    throw new HttpException(
      `Offer not configured correctly - ${context}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
