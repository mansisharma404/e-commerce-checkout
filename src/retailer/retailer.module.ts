import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterModule } from 'src/counter/counter.module';
import { RetailerController } from './retailer.controller';
import { RetailerDao } from './retailer.dao';
import { RetailerService } from './retailer.service';
import { Retailer, RetailerSchema } from './schemas/retailer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Retailer.name, schema: RetailerSchema },
    ]),
    CounterModule,
  ],
  controllers: [RetailerController],
  providers: [RetailerService, RetailerDao],
  exports: [RetailerService],
})
export class RetailerModule {}
