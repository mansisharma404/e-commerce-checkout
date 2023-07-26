import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Product } from '../product/schemas/product.schema';
import { Cart } from './schemas/user.schema';
import { UserDao } from './user.dao';

@Injectable()
export class UserService {
  constructor(
    private readonly userDao: UserDao,
    private readonly productService: ProductService,
  ) {}

  async createUser(createUserDto: Record<string, string>) {
    console.log(createUserDto);
    if (createUserDto.name == undefined)
      throw new HttpException(
        'cannot create user without name',
        HttpStatus.BAD_REQUEST,
      );
    if (createUserDto.email == undefined && createUserDto.mobile == undefined)
      throw new HttpException(
        'cannot create user without mobile or email',
        HttpStatus.BAD_REQUEST,
      );
    return await this.userDao.createUser(createUserDto);
  }

  async addItemToUserCart(userId: string, productId: string, units: number) {
    const product: Product | null = await this.productService.getProductById(
      productId,
    );
    if (product == null)
      throw new HttpException('Invalid product id ', HttpStatus.BAD_REQUEST);

    // TOO - check for overbooking policy is applicable an move to another function if required
    const userCart = await this.userDao.getUserCart(userId);
    let previouslyOrdered = false;
    const currentOrder = userCart?.orderedProducts ?? [];
    const currentOrderedProductDetails = currentOrder.map((order) => {
      if (order.productId == productId) {
        previouslyOrdered = true;
        const orderedUnits = order.units;
        const requiredUnits = orderedUnits + units;
        if (product?.availableUnits < requiredUnits)
          throw new HttpException(
            `Only ${product.availableUnits} units left `,
            HttpStatus.BAD_REQUEST,
          );
        order.units = requiredUnits;
      }
      return order;
    });
    if (previouslyOrdered == false)
      currentOrderedProductDetails.push({ productId: productId, units: units });

    await this.userDao.addProductToUserCartList(
      userId,
      currentOrderedProductDetails,
    );

    // TODO - check if we want to keep previous applied offer, currently will remove all previous applied offer when new item is added.
    // TODO - check if we want to apply best available offer automatically
    const updatedCartAfterRecalculation =
      await this.getCartValueAfterRemovingPreviouslyAppliedOffer(userId);
    return updatedCartAfterRecalculation;
  }

  async getCartValueAfterRemovingPreviouslyAppliedOffer(userId: string) {
    const userCart = await this.userDao.getUserCart(userId);
    if (userCart == null) return null;
    const orders: Record<string, any>[] = userCart.orderedProducts ?? [];
    if (orders.length == 0) return null;
    console.log(orders);
    let orderMRPSum = 0;
    for (let i = 0; i < orders.length; i++) {
      console.log(orders[i]);
      const product: Product | null = await this.productService.getProductById(
        orders[i].productId,
      );
      if (product == null)
        throw new HttpException('Invalid product id ', HttpStatus.BAD_REQUEST);
      orderMRPSum += product.mrp * orders[i].units;
    }

    const updateCartQuery: Cart = {
      totalMrp: orderMRPSum,
      orderedProducts: orders,
      deliveryCharge: 0,
      hiddenCharges: 0,
      netPayableAmount: orderMRPSum,
    };
    return this.userDao.updateUserCart(userId, updateCartQuery);
  }
}
