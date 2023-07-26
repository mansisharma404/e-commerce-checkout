import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDao } from './product.dao';

@Injectable()
export class ProductService {
  constructor(private readonly productDao: ProductDao) {}

  async createProduct(createProductDto: Record<string, string>) {
    console.log(createProductDto);
    if (
      createProductDto.name == undefined ||
      createProductDto.description == undefined
    )
      throw new HttpException(
        'cannot create Product without name',
        HttpStatus.BAD_REQUEST,
      );
    return await this.productDao.createProduct(createProductDto);
  }

  async getProductById(productId: string) {
    return this.productDao.getProductById(productId);
  }
}
