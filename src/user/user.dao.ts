import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterService } from '../counter/counter.service';
import { CounterModel } from '../counter/enums/counter.model.enums';
import { Cart, User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly counterService: CounterService,
  ) {}

  async createUser(userDto: Record<string, string>): Promise<User> {
    try {
      const { name, email, mobile } = userDto;
      const userId = await this.counterService.getId(CounterModel.USER);
      const createUserQuery: User = {
        _id: userId,
        name,
        email,
        mobile,
        createdAt: new Date(),
      };
      const user = await this.userModel.create(createUserQuery);
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async addProductToUserCartList(
    userId: string,
    currentOrderedProductDetails: Array<Record<string, any>>,
  ) {
    const userWithUpdatedCart = await this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { 'cart.orderedProducts': currentOrderedProductDetails },
        { new: true },
      )
      .exec();
    return userWithUpdatedCart;
  }

  async updateUserCart(userId: string, cart: Cart) {
    const userWithUpdatedCart = await this.userModel
      .findOneAndUpdate({ _id: userId }, { cart: cart }, { new: true })
      .exec();
    return userWithUpdatedCart;
  }

  async getUserCart(userId: string) {
    const userWithUpdatedCart = await this.userModel.findOne({
      _id: userId,
    });
    return userWithUpdatedCart?.cart;
  }
}
