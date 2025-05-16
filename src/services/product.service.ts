import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateStatusDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    if (!dto.name || !dto.price || !dto.image || !dto.category) {
      throw new BadRequestException('Missing required fields');
    }
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }

  async update(id: number, dto: CreateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    const updated = Object.assign(product, dto);
    return this.productRepository.save(updated);
  }

  async updateAvailability(id: number, dto: UpdateStatusDto): Promise<Product> {
    const product = await this.findOne(id);

    product.available = dto.available;
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
