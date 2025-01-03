import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: 'product_categories' })
export class ProductCategory {
  // id, productId, name, description
  // Todo Here!
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(
    () => Product,
    (product) => product.productCategories
  )
  product: Product;
}
