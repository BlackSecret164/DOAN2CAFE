import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order_tb.entity';
import { OrderDetails } from 'src/entities/order-details.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/order.dto';
import { CreateOrderDetailsDto } from 'src/dtos/order-details.dto';

@Injectable()
export class BranchOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderDetails)
    private readonly detailRepo: Repository<OrderDetails>,
  ) {}

  async findAllByBranch(branchId: number) {
    return this.orderRepository.find({
      where: { branch: { id: branchId } },
      relations: ['customer', 'staff', 'table', 'details', 'details.product'],
      order: { orderDate: 'DESC' },
    });
  }

  async findLatestInBranch(branchId: number) {
  const raw = await this.orderRepository
    .createQueryBuilder('order')
    .select([
      'order.id AS id',
      'order.phoneCustomer AS phone',
      'order.serviceType AS "serviceType"',
      'order.orderDate AS "orderDate"',
      'order.tableID AS "tableID"',
    ])
    .where('order.branchID = :branchId', { branchId })
    .orderBy('order.id', 'DESC')
    .limit(1)
    .getRawOne();

  if (!raw) {
    throw new NotFoundException('No orders found in this branch');
  }

  return raw;
}


  async findOneByBranch(id: number, branchId: number) {
    const order = await this.orderRepository.findOne({
      where: { id, branch: { id: branchId } },
      relations: ['customer', 'staff', 'table', 'details', 'details.product'],
    });

    if (!order) throw new NotFoundException('Order not found in this branch');
    return order;
  }

  async create(dto: CreateOrderDto, branchId: number) {
    const order = this.orderRepository.create({
      ...dto,
      branchId: branchId,
    });
    return this.orderRepository.save(order);
  }

  async updateInBranch(id: number, dto: UpdateOrderDto, branchId: number) {
    const order = await this.orderRepository.findOne({ where: { id, branchId: branchId } });
    if (!order) throw new NotFoundException('Order not found in this branch');

    Object.assign(order, dto);
    return this.orderRepository.save(order);
  }

  async markCompleteInBranch(id: number, branchId: number) {
    const result = await this.orderRepository.update({ id, branchId: branchId }, { status: 'Hoàn thành' });
    if (result.affected === 0) throw new NotFoundException(`Order ${id} not found in branch`);
    return { message: 'Order marked as completed' };
  }

  async markCancelInBranch(id: number, branchId: number) {
    const result = await this.orderRepository.update({ id, branchId: branchId }, { status: 'Đã hủy' });
    if (result.affected === 0) throw new NotFoundException(`Order ${id} not found in branch`);
    return { message: 'Order marked as cancelled' };
  }

  async addDetailInBranch(orderID: number, dto: CreateOrderDetailsDto, branchId: number) {
    const order = await this.orderRepository.findOne({ where: { id: orderID, branchId: branchId } });
    if (!order) throw new NotFoundException('Order not found in this branch');

    const detail = this.detailRepo.create({
      ...dto,
      order: { id: orderID },
    });
    return this.detailRepo.save(detail);
  }

  async remove(id: number, branchId: number) {
    const result = await this.orderRepository.delete({ id, branchId: branchId });
    if (result.affected === 0) throw new NotFoundException(`Order ${id} not found in branch`);
    return { message: 'Order deleted successfully' };
  }
}