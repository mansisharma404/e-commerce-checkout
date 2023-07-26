import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterModule } from 'src/counter/counter.module';
import { OfferService } from 'src/offers/offer.service';
import { OfferController } from './offer.controller';
import { OfferDao } from './offer.dao';
import { Offer, OfferSchema } from './schemas/offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
    CounterModule,
  ],
  controllers: [OfferController],
  providers: [OfferService, OfferDao],
  exports: [OfferService],
})
export class OfferModule {}
