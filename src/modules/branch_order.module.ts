import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchOrderController } from '../controllers/branch_order.controller';
import { BranchOrderService } from '../services/branch_order.service';
import { Order } from '../entities/order_tb.entity';
import { OrderDetails } from '../entities/order-details.entity';
import { ProductSize } from 'src/entities/product_size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, ProductSize])],
  controllers: [BranchOrderController],
  providers: [BranchOrderService],
})
export class BranchOrderModule {}
