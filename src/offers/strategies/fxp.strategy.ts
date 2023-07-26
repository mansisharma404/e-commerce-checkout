import { HttpException, HttpStatus } from '@nestjs/common';
import { IOfferConfig } from '../interfaces/offer-config.interface';
import { IOfferStrategy } from '../interfaces/offer-strategy.interface';

export class fxpStrategy implements IOfferStrategy {
  getProductDiscountedMRP(context: IOfferConfig): number {
    if (context.products == undefined)
      throw new HttpException(
        `Offer not configured yet - ${context}`,
        HttpStatus.BAD_REQUEST,
      );
    if (
      context.minimumOrderValue != undefined &&
      context.discountApplicableOnOverallProductMRP == true
    ) {
      throw new HttpException(
        `Offer not configured yet - ${context}`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (
      context.minimumProductCount != undefined &&
      context.discountApplicableOnEachArticle == true &&
      context.discountPercent != undefined
    ) {
      let normalMRP = 0;
      let productCount = 0;
      for (let i = 0; i < context.products.length; i++) {
        productCount += context.products[i].units;
        normalMRP += context.products[i].mrp * context.products[i].units;
      }
      return productCount >= context.minimumProductCount
        ? normalMRP * ((100 - context.discountPercent) / 100)
        : normalMRP;
    }
    throw new HttpException(
      `Offer not configured correctly - ${context}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
