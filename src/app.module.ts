import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterModule } from './counter/counter.module';
import { OfferModule } from './offers/offer.module';
import { ProductModule } from './product/product.module';
import { RetailerModule } from './retailer/retailer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/e-commerce-checkout'),
    UserModule,
    CounterModule,
    RetailerModule,
    ProductModule,
    OfferModule,
  ],
})
export class AppModule {}
