import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Product } from './product.entity';
import { RawMaterial } from './rawmaterial.entity';

@Entity({ name: 'product_material' })
export class ProductMaterial {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  materialId: number;

  @ManyToOne(() => Product, (product) => product.productMaterials)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => RawMaterial, (rawMaterial) => rawMaterial.productMaterials)
  @JoinColumn({ name: 'materialId' })
  rawMaterial: RawMaterial;

  @Column('numeric')
  materialQuantity: number;
}

