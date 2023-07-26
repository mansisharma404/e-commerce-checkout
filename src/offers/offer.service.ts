import { Injectable } from '@nestjs/common';
import { OfferStrategyEnum } from './enums/offerStrategy.enum';
import { IOfferConfig } from './interfaces/offer-config.interface';
import { OfferDao } from './offer.dao';
import { Offer } from './schemas/offer.schema';
import { bngmStrategy } from './strategies/bngm.strategy';
import { fxpStrategy } from './strategies/fxp.strategy';

@Injectable()
export class OfferService {
  constructor(private readonly offerDao: OfferDao) {}

  async getActiveOffersForUsersCart(
    orderedProductList?: Array<Record<string, any>>,
  ): Promise<Array<Offer>> {
    const offerList: Offer[] = [];
    if (orderedProductList == null || orderedProductList.length == 0)
      return offerList;

    for (let i = 0; i < orderedProductList.length; i++) {
      const activeOffer = await this.offerDao.getActiveOfferByProductId(
        orderedProductList[i].productId,
      );
      if (activeOffer != null) offerList.push(activeOffer);
    }
    return offerList;
  }

  async getDiscountAmountFromOfferForProductList(
    offer: Offer,
    orderList: Record<string, any>[],
  ) {
    const strategy = offer.offerStrategy;
    let ins;
    if (strategy == OfferStrategyEnum.BUY_N_GET_M) {
      ins = new bngmStrategy();
    } else if (strategy == OfferStrategyEnum.FLAT_X_PERCENT) {
      ins = new fxpStrategy();
    }
    const context: IOfferConfig = {
      ...offer.offerConfig,
      productsInCart: orderList,
    };
    if (ins && offer.applicableOnProductId != null)
      return ins.getProductDiscountAmount(offer.applicableOnProductId, context);
    return 0;
  }

  async createOffer(createOfferDto: Record<string, string>) {
    console.log(createOfferDto);
    return await this.offerDao.createOffer(createOfferDto);
  }
}
