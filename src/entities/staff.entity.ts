import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { WorkShift } from './workshift.entity';
import { Role } from './role.entity';
import { Order } from './order_tb.entity';
import { ActivityLog } from './activity_log.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 10, nullable: true })
  gender: string;

  @Column('date', { nullable: true })
  birth: string;

  @Column({ length: 40, nullable: true })
  address: string;

  @Column({ length: 15 })
  phone: string;

  @ManyToOne(() => WorkShift, (workShift) => workShift.staff)
  @JoinColumn({ name: 'workshiftid' })
  workShift: WorkShift;

  @Column('integer', { name: 'workhours', default: 0 })
  workHours: number;

  @Column('integer', { default: 3000000 })
  salary: number;

  @Column({ name: 'typestaff', length: 50, nullable: true })
  typeStaff: string;

  @Column('date', { name: 'startdate', nullable: true })
  startDate: string;

  @Column('boolean', { name: 'activestatus', default: true })
  activeStatus: boolean;

  @ManyToOne(() => Role, (role) => role.staff)
  @JoinColumn({ name: 'roleid' })
  roles: Role;

  @Column({ length: 20 })
  password: string;

  @Column('integer', { name: 'minsalary', default: 30000 })
  minsalary: number;

  @Column({ name: 'role', length: 15 })
  role: string;

  @OneToMany(() => Order, (order) => order.staff)
  orders: Order[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.staff)
  activityLogs: ActivityLog[];
}
