import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order_tb.entity';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  status: string;

  @Column({ length: 15, nullable: true, name: 'phoneorder' })
  phoneOrder?: string;

  @Column({ type: 'timestamp', nullable: true, name: 'bookingtime' })
  bookingTime?: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'seatingtime' })
  seatingTime?: Date;

  @Column({ type: 'int' })
  seat: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}

