import { Body, Controller, Post } from '@nestjs/common';
import { RetailerService } from './retailer.service';

@Controller('retailer')
export class RetailerController {
  constructor(private readonly RetailerService: RetailerService) {}

  @Post('/register')
  async createRetailer(@Body() createRetailerDto: Record<string, any>) {
    //TODO - add admin to create retailers
    return await this.RetailerService.createRetailer(createRetailerDto);
  }
}
