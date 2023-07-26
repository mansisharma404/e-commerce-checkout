import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterModule } from 'src/counter/counter.module';
import { ProductController } from './product.controller';
import { ProductDao } from './product.dao';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CounterModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductDao],
  exports: [ProductService],
})
export class ProductModule {}
