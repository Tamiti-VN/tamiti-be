import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductPrice } from "./product.price.entity";
import { ProductCategory } from "./product.category.entity";

@Entity({ name: 'products' })
export class Product {
  // id, name, description, image
  // Todo Here!
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(
    () => ProductPrice,
    (productPrice) => productPrice.product
  )
  productPrices: ProductPrice[];

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product
  )
  productCategories: ProductCategory[];
}
