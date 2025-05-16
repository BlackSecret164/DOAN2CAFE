import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { RawMaterial } from './rawmaterial.entity';
import { OrderDetails } from './order-details.entity';
import { ProductMaterial } from './product-material.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  category: string;

  @Column({ length: 255 })
  image: string;

  @Column({ default: true })
  available: boolean;

  @Column('int')
  price: number;

  @Column('int')
  upsize: number;

  @Column({ type: 'boolean', default: false })
  sizes: boolean;

  @Column({ type: 'boolean', default: false })
  sizem: boolean;

  @Column({ type: 'boolean', default: false })
  sizel: boolean;

  @Column({ type: 'boolean', default: false })
  hot: boolean;

  @Column({ type: 'boolean', default: false })
  cold: boolean;

  @OneToMany(() => ProductMaterial, (pm) => pm.product)
    productMaterials: ProductMaterial[];


  @OneToMany(() => OrderDetails, orderDetails => orderDetails.product)
  orderDetails: OrderDetails[];

}
