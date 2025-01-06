import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product-category.entity";

@Entity({ name: 'categories' })
export class Category {
  // id, productId, name, description
  // Todo Here!
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
    { nullable: true }
  )
  productCategories: ProductCategory[];
}
