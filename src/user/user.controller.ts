import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
// toDO add middle for api key to check x-source-key from headers as authentication
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async createUser(@Body() createUserDto: Record<string, any>) {
    //TODO - add authentication
    return await this.userService.createUser(createUserDto);
  }

  @Post('/add-to-cart')
  async addProductToCart(@Body() addToCartDto: Record<string, any>) {
    //TODO - take userId out of request body add middleware and extract from jwt
    const userId = addToCartDto.userId;
    return this.userService.addItemToUserCart(
      userId,
      addToCartDto.productId,
      addToCartDto.units,
    );
  }
}
