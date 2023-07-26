import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterModule } from 'src/counter/counter.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserDao } from './user.dao';
import { UserService } from './user.service';
import { ProductModule } from '../product/product.module';
import { OfferModule } from '../offers/offer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CounterModule,
    ProductModule,
    OfferModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserDao],
  exports: [UserService],
})
export class UserModule {}
