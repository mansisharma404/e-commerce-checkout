import { Body, Controller, Post } from '@nestjs/common';
import { OfferService } from './offer.service';

@Controller('offer')
// toDO add middle for api key to check x-source-key from headers as authentication
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('')
  async createUser(@Body() createUserDto: Record<string, any>) {
    //TODO - add authentication
    return await this.offerService.createOffer(createUserDto);
  }
}
