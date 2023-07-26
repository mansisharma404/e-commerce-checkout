import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterService } from '../counter/counter.service';
import { CounterModel } from '../counter/enums/counter.model.enums';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductDao {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly counterService: CounterService,
  ) {}

  async createProduct(product: Record<string, any>): Promise<Product> {
    try {
      const {
        name,
        description,
        productType,
        mrp,
        currency,
        retailerId,
        availableUnits,
      } = product;
      const ProductId = await this.counterService.getId(CounterModel.PRODUCT);
      const createProductQuery: Product = {
        _id: ProductId,
        name,
        description,
        productType,
        mrp,
        currency,
        retailerId,
        availableUnits,
        createdAt: new Date(),
      };
      const Product = await this.productModel.create(createProductQuery);
      return Product;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getProductById(productId: string) {
    return this.productModel.findOne({ _id: productId }).lean();
  }
}
