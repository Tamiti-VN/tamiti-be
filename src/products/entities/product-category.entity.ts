import { Category } from './category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: 'product_categories' })
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Product,
    (product) => product.productCategories,
    { nullable: true }
  )
  product: Product;

  @ManyToOne(
    () => Category,
    (category) => category.productCategories,
    { nullable: true }
  )
  category: Category;
}
