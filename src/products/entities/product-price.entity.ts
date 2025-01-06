import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: 'product_prices' })
export class ProductPrice {
  // id, productId, size, price
  // Todo Here!
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(
    () => Product,
    (product) => product.prices
  )
  product: Product;
}
