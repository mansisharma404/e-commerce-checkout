import { HttpException, HttpStatus } from '@nestjs/common';
import { IOfferConfig } from '../interfaces/offer-config.interface';
import { IOfferStrategy } from '../interfaces/offer-strategy.interface';

export class bngmStrategy implements IOfferStrategy {
  getProductDiscountAmount(
    validProductId: string,
    context: IOfferConfig,
  ): number {
    if (context.productsInCart == undefined)
      throw new HttpException(
        `No product to apply offer -  ${context}`,
        HttpStatus.BAD_REQUEST,
      );
    if (
      context.buyN == undefined ||
      context.getM == undefined ||
      context.freeProductId == undefined
    )
      throw new HttpException(
        `Offer not configured correctly - ${context}`,
        HttpStatus.BAD_REQUEST,
      );

    const cartItems = context.productsInCart;
    const freeItemsArray = cartItems.filter((item) => {
      return item.productId == context.freeProductId;
    });
    const validOfferProductLists = cartItems.filter((item) => {
      return item.productId == validProductId;
    });
    if (freeItemsArray.length == 0 || validOfferProductLists.length == 0)
      return 0;
    const offerProductDetails = validOfferProductLists[0];
    if (offerProductDetails.units <= context.buyN) return 0;

    if (context.freeProductId == validProductId) {
      console.log('*****************************');
      const div = Math.floor(
        offerProductDetails.units / (context.buyN + context.getM),
      );
      const modulus = Math.floor(
        offerProductDetails.units % (context.buyN + context.getM),
      );
      console.log(
        Math.max(
          div * context.getM,
          div * context.getM + modulus - context.buyN,
        ),
      );
      return (
        Math.max(
          div * context.getM,
          div * context.getM + modulus - context.buyN,
        ) * offerProductDetails.mrp
      );
    }

    // Add logic for different product;
    return 0;
  }
}
