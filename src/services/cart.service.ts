// services/cart.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cart_item.entity';
import { Customer } from '../entities/customer.entity';
import { Product } from '../entities/product.entity';
import { ProductSize } from '../entities/product_size.entity';
import { AddToCartDto, UpdateCartItemDto, CreateCartItemDto } from '../dtos/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(ProductSize) private productSizeRepo: Repository<ProductSize>
  ) {}

  async findAll(phoneCustomer: string) {
    const items = await this.cartRepo.find({
      where: { phoneCustomer },
      relations: ['product'],
    });

    return Promise.all(
      items.map(async (item) => {
        const size = await this.productSizeRepo.findOne({
          where: { product: { id: item.product.id }, sizeName: item.size },
        });

        return {
          id: item.id,
          quantity: item.quantity,
          size: item.size,
          productId: item.product.id,
          name: item.product.name,
          image: item.product.image,
          price: size?.price ?? 0,
        };
      })
    );
  }

  async create(dto: CreateCartItemDto) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const customer = await this.customerRepo.findOne({ where: { phone: dto.phoneCustomer } });
    if (!customer) throw new NotFoundException('Customer not found');

    const existing = await this.cartRepo.findOne({
      where: {
        phoneCustomer: dto.phoneCustomer,
        product: { id: dto.productId },
        size: dto.size,
        mood: dto.mood,
      },
    });

    if (existing) {
      existing.quantity += dto.quantity;
      return this.cartRepo.save(existing);
    }

    const newItem = this.cartRepo.create({
      product,
      size: dto.size,
      mood: dto.mood,
      quantity: dto.quantity,
      phoneCustomer: dto.phoneCustomer,
    });

    return this.cartRepo.save(newItem);
  }

  async updateQuantity(id: number, dto: UpdateCartItemDto) {
    const item = await this.cartRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Cart item not found');
    item.quantity = dto.quantity;
    return this.cartRepo.save(item);
  }

  async remove(id: number) {
    const result = await this.cartRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Cart item not found');
    return { message: 'Deleted' };
  }

  async clearCart(phoneCustomer: string) {
    await this.cartRepo.delete({ phoneCustomer });
    return { message: 'Cart cleared' };
  }
}
