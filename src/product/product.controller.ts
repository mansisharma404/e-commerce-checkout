import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Post('/register')
  async createProduct(@Body() createProductDto: Record<string, any>) {
    //TODO - add admin to create Products
    return await this.ProductService.createProduct(createProductDto);
  }
}
