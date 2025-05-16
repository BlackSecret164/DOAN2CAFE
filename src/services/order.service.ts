import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order_tb.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateOrderDto,UpdateOrderDto } from '../dtos/order.dto';
import { OrderDetails } from '../entities/order-details.entity';
import { CreateOrderDetailsDto } from 'src/dtos/order-details.dto';
import { camelCase } from 'lodash';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly detailRepo: Repository<OrderDetails>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll() {
  return this.orderRepo
    .createQueryBuilder('order')
    .leftJoin('order.staff', 'staff')
    .leftJoin('order.details', 'detail')
    .select([
      'order.id AS id',
      'order.phoneCustomer AS phone',
      'order.serviceType AS "serviceType"',
      'order.totalPrice AS "totalPrice"',
      'order.tableID AS "tableID"',
      'order.orderDate AS "orderDate"',
      'order.status AS "status"',
      'staff.name AS "staffName"',
      'ARRAY_AGG(detail.productID) AS "productIDs"',
    ])
    .groupBy('order.id, staff.name')
    .getRawMany();
  }

  async findLatest() {
  const raw = await this.orderRepo
    .createQueryBuilder('order')
    .select([
      'order.id AS id',
      'order.phoneCustomer AS phone',
      'order.serviceType AS "serviceType"',
      'order.orderDate AS "orderDate"',
      'order.tableID AS "tableID"',
    ])
    .orderBy('order.id', 'DESC')
    .limit(1)
    .getRawOne();

  if (!raw) {
    throw new NotFoundException('No orders found');
  }

  return raw;
}



  async findOne(id: number) {
  const order = await this.orderRepo
    .createQueryBuilder('order')
    .leftJoin('order.staff', 'staff')
    .leftJoin('order.details', 'detail')
    .select([
      'order.id AS id',
      'order.phoneCustomer AS phone',
      'order.serviceType AS "serviceType"',
      'order.totalPrice AS "totalPrice"',
      'order.tableID AS "tableID"',
      'order.orderDate AS "orderDate"',
      'order.status AS "status"',
      'staff.name AS "staffName"',
      'ARRAY_AGG(detail.productID) AS "productIDs"',
    ])
    .where('order.id = :id', { id })
    .groupBy('order.id, staff.name')
    .getRawOne();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async create(dto: CreateOrderDto) {
    const order = this.orderRepo.create(dto);
    return this.orderRepo.save(order);
  }

  async update(id: number, dto: UpdateOrderDto) {
    const result = await this.orderRepo.update(id, dto);
    if (result.affected === 0) throw new NotFoundException(`Order ${id} not found`);
    return { message: 'Order edited successfully' };
  }

  async markComplete(id: number) {
    const result = await this.orderRepo.update(id, { status: 'Hoàn thành' });
    if (result.affected === 0) throw new NotFoundException(`Order ${id} not found`);
    return { message: 'Order marked as completed' };
  }

  async markCancel(id: number) {
    const result = await this.orderRepo.update(id, { status: 'Đã hủy' });
    if (result.affected === 0) throw new NotFoundException(`Order ${id} not found`);
    return { message: 'Order marked as cancelled' };
  }

  async remove(id: number) {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Order ${id} not found`);
    return { message: 'Order deleted successfully' };
  }

  async addDetail(orderID: number, dto: CreateOrderDetailsDto) {
  const detail = this.detailRepo.create({
    ...dto,
    order: { id: orderID },
  });
  return this.detailRepo.save(detail);
  }
}
