import { Injectable } from '@nestjs/common';
import { Cart } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class OfferService {
  constructor(private readonly userService: UserService) {}

  async getActiveOffersForUsersCart(cart: Cart) {
    const cartHasProducts = cart?.orderedProducts != undefined;
    if (!cartHasProducts) return null;
    const orderedProductsCode = cart.orderedProducts?.map((product) => {
      return product.productId;
    });

    // this will give all offers list classes which can be applied
    // need to know about single and multiple offer application
  }

  async getCartValueAfterAppliedOffer(cart: Cart) {
    const cartHasProducts = cart?.orderedProducts != undefined;
    if (!cartHasProducts) return null;
    const orderedProductsCode = cart.orderedProducts?.map((product) => {
      return product.productId;
    });

    // this will give list of all offers strategy classes which can be applied on cart
    // need to know about single and multiple offer application
  }
}
