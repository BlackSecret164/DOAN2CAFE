import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { Product } from './product.entity';
import { ProductMaterial } from './product-material.entity';

@Entity('rawmaterial')
export class RawMaterial {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column('integer', { name: 'quantityimported' })
  quantityImported: number;

  @Column('integer', { name: 'quantitystock', nullable: true })
  quantityStock: number;

  @Column('decimal', { name: 'price' })
  price: number;

  @Column({ name: 'storagetype', length: 20 })
  storageType: string;

  @Column('date', { name: 'importdate' })
  importDate: string;

  @Column('date', { name: 'expirydate' })
  expiryDate: string;

  @OneToMany(() => ProductMaterial, (pm) => pm.rawMaterial)
  productMaterials: ProductMaterial[];
}