import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../entities/order_tb.entity';
import { Product } from '../entities/product.entity';
import { Customer } from '../entities/customer.entity';
import { Staff } from '../entities/staff.entity';
import { Table } from '../entities/tables.entity';
import { OrderDetails } from '../entities/order-details.entity';

@Injectable()
export class ReportService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(Table) private tableRepo: Repository<Table>,
    @InjectRepository(OrderDetails) private orderDetailRepo: Repository<OrderDetails>,
  ) {}

  async getSystemReport() {
    // Tổng quan
    const [totalPayment, totalProduct, totalCustomer, totalStaff, totalOrder, totalTable] = await Promise.all([
      this.orderRepo.createQueryBuilder().select('SUM(totalprice)', 'sum').getRawOne(),
      this.productRepo.count(),
      this.customerRepo.count(),
      this.staffRepo.count(),
      this.orderRepo.count(),
      this.tableRepo.count(),
    ]);

    // Đơn hàng & doanh thu 14 ngày
    const last14DaysOrder = await this.dataSource.query(`
      SELECT DATE(orderdate) AS date, COUNT(*) AS amount
      FROM order_tb
      WHERE orderdate >= NOW() - INTERVAL '14 days'
      GROUP BY DATE(orderdate)
      ORDER BY date ASC
    `);
    const last14DaysOrderValue = await this.dataSource.query(`
      SELECT DATE(orderdate) AS date, SUM(totalprice) AS amount
      FROM order_tb
      WHERE orderdate >= NOW() - INTERVAL '14 days'
      GROUP BY DATE(orderdate)
      ORDER BY date ASC
    `);

    // Đơn hàng & doanh thu 30 ngày
    const last30DaysOrder = await this.dataSource.query(`
      SELECT DATE(orderdate) AS date, COUNT(*) AS amount
      FROM order_tb
      WHERE orderdate >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(orderdate)
      ORDER BY date ASC
    `);
    const last30DaysOrderValue = await this.dataSource.query(`
      SELECT DATE(orderdate) AS date, SUM(totalprice) AS amount
      FROM order_tb
      WHERE orderdate >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(orderdate)
      ORDER BY date ASC
    `);

    // Doanh thu theo loại sản phẩm
    const salesByCategory = await this.dataSource.query(`
      SELECT category, COUNT(*) AS amount
      FROM product
      JOIN order_details ON product.id = order_details.productid
      GROUP BY category
    `);

    // Xếp hạng khách hàng
    const rankMap = await this.customerRepo.query(`
      SELECT rank, COUNT(*) AS count
      FROM customer
      GROUP BY rank
    `);

    // Thống kê Takeaway / Dine-in
    const [serviceType] = await this.dataSource.query(`
      SELECT 
        SUM(CASE WHEN servicetype = 'Take Away' THEN 1 ELSE 0 END) AS takeAway,
        SUM(CASE WHEN servicetype = 'Dine In' THEN 1 ELSE 0 END) AS dineIn
      FROM order_tb
    `);

    // Top sản phẩm bán chạy
    const topProducts = await this.dataSource.query(`
      SELECT product.name, COUNT(order_details.productid) AS amount
      FROM order_details
      JOIN product ON product.id = order_details.productid
      GROUP BY product.name
      ORDER BY amount DESC
      LIMIT 5
    `);

    return {
      totalPayment: parseFloat(totalPayment.sum) || 0,
      totalProduct,
      totalCustomer,
      totalStaff,
      totalOrder,
      totalTable,
      last14DaysOrder: last14DaysOrder.map(row => ({
        date: row.date,
        amount: parseInt(row.amount, 10),
      })),
      last14DaysOrderValue: last14DaysOrderValue.map(row => ({
        date: row.date,
        amount: parseFloat(row.amount),
      })),
      last30DaysOrder: last30DaysOrder.map(row => ({
        date: row.date,
        amount: parseInt(row.amount, 10),
      })),
      last30DaysOrderValue: last30DaysOrderValue.map(row => ({
        date: row.date,
        amount: parseFloat(row.amount),
      })),
      salesByCategory: salesByCategory.map(row => ({
        category: row.category,
        amount: parseInt(row.amount, 10),
      })),
      rankMap: rankMap.reduce((acc, row) => {
        acc[row.rank] = parseInt(row.count, 10);
        return acc;
      }, {}),
      serviceType: {
        takeAway: parseInt(serviceType.takeaway, 10),
        dineIn: parseInt(serviceType.dinein, 10),
      },
      topProducts: topProducts.map(row => ({
        name: row.name,
        amount: parseInt(row.amount, 10),
      })),
    };
  }
}
