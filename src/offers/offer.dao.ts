import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterService } from '../counter/counter.service';
import { CounterModel } from '../counter/enums/counter.model.enums';
import { Offer, OfferDocument } from './schemas/offer.schema';

@Injectable()
export class OfferDao {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<OfferDocument>,
    private readonly counterService: CounterService,
  ) {}

  async createOffer(offerDto: Record<string, any>): Promise<Offer> {
    try {
      const {
        applicableOnProductId,
        offerStrategy,
        offerConfig,
        retailerId,
        isActive,
      } = offerDto;
      const offerId = await this.counterService.getId(CounterModel.OFFER);
      const createProductQuery: Offer = {
        _id: offerId,
        applicableOnProductId,
        offerStrategy,
        offerConfig,
        retailerId,
        isActive,
      };
      const offer = await this.offerModel.create(createProductQuery);
      return offer;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  async getActiveOfferByProductId(productId: string): Promise<Offer | null> {
    return this.offerModel.findOne({
      applicableOnProductId: productId,
      isActive: true,
    });
  }
}
