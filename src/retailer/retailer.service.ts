import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RetailerDao } from './retailer.dao';

@Injectable()
export class RetailerService {
  constructor(private readonly RetailerDao: RetailerDao) {}

  async createRetailer(createRetailerDto: Record<string, string>) {
    console.log(createRetailerDto);
    if (createRetailerDto.name == undefined)
      throw new HttpException(
        'cannot create Retailer without name',
        HttpStatus.BAD_REQUEST,
      );
    if (
      createRetailerDto.email == undefined &&
      createRetailerDto.mobile == undefined
    )
      throw new HttpException(
        'cannot create Retailer without mobile or email',
        HttpStatus.BAD_REQUEST,
      );
    return await this.RetailerDao.createRetailer(createRetailerDto);
  }
}
