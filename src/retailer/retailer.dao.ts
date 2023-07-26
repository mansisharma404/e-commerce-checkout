import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterService } from '../counter/counter.service';
import { CounterModel } from '../counter/enums/counter.model.enums';
import { Retailer, RetailerDocument } from './schemas/retailer.schema';

@Injectable()
export class RetailerDao {
  constructor(
    @InjectModel(Retailer.name)
    private readonly retailerModel: Model<RetailerDocument>,
    private readonly counterService: CounterService,
  ) {}

  async createRetailer(retailerDto: Record<string, string>): Promise<Retailer> {
    try {
      const { name, email, mobile } = retailerDto;
      const retailerId = await this.counterService.getId(CounterModel.RETAILER);
      const createRetailerQuery: Retailer = {
        _id: retailerId,
        name,
        email,
        mobile,
        createdAt: new Date(),
      };
      const retailer = await this.retailerModel.create(createRetailerQuery);
      return retailer;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
