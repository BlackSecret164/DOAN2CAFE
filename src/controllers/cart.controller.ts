import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException, ParseIntPipe
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CreateCartItemDto, UpdateCartItemDto } from '../dtos/cart.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Query('phoneCustomer') phone: string) {
    return this.cartService.findAll(phone);
  }

  @Post()
  addItem(@Body() dto: CreateCartItemDto) {
    return this.cartService.create(dto);
  }

  @Put(':id')
  updateQuantity(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCartItemDto) {
    return this.cartService.updateItem(id, dto);
  }

  @Delete(':id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.remove(id);
  }

  @Delete()
  clearCart(@Query('phoneCustomer') phone: string) {
    return this.cartService.clearCart(phone);
  }
}

